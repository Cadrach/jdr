var Calculation = Class.extend({
    init: function(){

    },

    getValue: function(){
        throw 'Must be extended';
    },
    render: function(){
        throw 'Must be extended';
    }
})

var Calculation_Value = Calculation.extend({
    init: function(value){
        this._super();
        this.value = Number(value);
    },
    getValue: function(){
        return this.value;
    },
    render: function(){
        return this.value;
    }
});

/**
 * Calculation_Dice
 */
Calculation_Dice = Calculation.extend({
    init: function(type, number){
        this._super();
        this.type = type;
        this.number = number;
    },

    getValue: function(){
        if( ! this.value)
        {
            this.rolls = [];
            this.value = 0;
            for(var i=0;i<this.number;i++)
            {
                var value = Math.floor(Math.random() * this.type + 1);
                this.rolls.push(value);
                this.value+=value;
            }
        }
        return this.value;
    },

    render: function(){
        var value = this.getValue();
        return '[' + this.rolls.join(' + ') + ']';
    }
});

Calculation_Parser = Calculation.extend({
    init: function(string, sheet){
        this._super();
        this.string = string.replace(/ /g, '');
        this.sheet = sheet;
        this.validate();
    },
    
    /**
     * Validate the string passed
     */
    getBlocks: getBlocks = function(){
        if( ! this.blocks)
        {
            //Init blocks
            this.blocks = [];

            var block = '';
            var max = this.string.length;
            for(var i=0; i<max; i++)
            {
                var c = this.string[i];
                if(['*','/','+','-'].indexOf(c)>=0)
                {
                    //Found math operation, create 2 blocks, one for value and one for operation
                    this.addBlock(block);
                    this.addOperation(c);
                    //Reset block
                    block = '';
                }
                else if(c == '(')
                {
                    //Found open parenthesis, looking for closing one
                    var p = i;
                    var bracketCount = 0;
                    do{
                        if(this.string.charAt(p) == '(')
                        {
                            bracketCount++;
                        }
                        else if(this.string.charAt(p) == ')')
                        {
                            bracketCount--;
                        }
                        p++;
                    }while(bracketCount > 0 && p<max);
                    this.addBlock(new Calculation_Parser(this.string.slice(i+1, p-1), this.sheet));
                    i = p-1;
                    //Reset block
                    block = '';
                }
                else
                {
                    //Reading a block, continue storing it
                    block+=c;
                }
            }
            if(block)
            {
                //If a block is left over at the end of the parsing, add it
                this.addBlock(block);
            }
        }

        return this.blocks;
    },

    /**
     * Analyse the string to create the operations & blocks
     */
    validate: function(){
        //Verifications parenthesis
        var open = this.string.match(/\(/g);
        var close =this.string.match(/\)/g);
        if( (open!==null || close !== null) && open.length != close.length)
        {
            throw 'Wrong number of parenthesis';
        }
    
        this.getBlocks().forEach(function(block){
            if(['*','/','+','-'].indexOf(block)<0 && !(block instanceof Calculation))
            {
                throw 'Unknown block "'+block+'"';
            }
        });
    
    },

    /**
     * Create a block
     * @param string
     */
    addBlock: function (element){
        if(element)
        {
            if(typeof element == 'string')
            {
                var match;
                if(match = element.match(/^([0-9]*)D([0-9]*)$/i))
                {
                    element = new Calculation_Dice(match[2], match[1]);
                }
                else if(match = element.match(/^([0-9]*)$/))
                {
                    element = new Calculation_Value(element);
                }
                else if(this.sheet.getFeatureFromCode(element))
                {
                    element = new Calculation_Value(this.sheet.getFeatureFromCode(element).getValue());
                }
            }

            this.blocks.push(element);
        }
    },

    /**
     * Create operation
     * @param string
     */
    addOperation: function(string){
        this.blocks.push(string);
    },


    /**
     * Get value of Calculation_Parser
     */
    getValue: function(){
        var blocks = this.getBlocks().slice(); //copy blocks

        //Apply operations
        var position;
        while((position = blocks.indexOf('*'))>=0)
        {
            blocks.splice(position-1, 3, new Calculation_Value(blocks[position-1].getValue() * blocks[position+1].getValue()));
        }
        while((position = blocks.indexOf('/'))>=0)
        {
            blocks.splice(position-1, 3, new Calculation_Value(blocks[position-1].getValue() / blocks[position+1].getValue()));
        }
        while((position = blocks.indexOf('+'))>=0)
        {
            blocks.splice(position-1, 3, new Calculation_Value(blocks[position-1].getValue() + blocks[position+1].getValue()));
        }
        while((position = blocks.indexOf('-'))>=0)
        {
            blocks.splice(position-1, 3, new Calculation_Value(blocks[position-1].getValue() - blocks[position+1].getValue()));
        }

        //Get final value
        console.log(this.string, '=', this.render(), '=', blocks[0].getValue());
        return blocks[0].getValue();
    },

    render: function(){
        var text = '';
        this.getBlocks().forEach(function(b){
            if(b instanceof Calculation)
            {
                text+= b.render();
            }
            else
            {
                text+=b;
            }
        });
        return '(' + text + ')';
    }
});