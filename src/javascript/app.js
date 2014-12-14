Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    logger: new Rally.technicalservices.Logger(),
    items: [
        {xtype:'container',itemId:'outer_box', margin: 10, layout: { type:'hbox' }, items: [
            {xtype:'container',itemId: 'filler', flex: 1},
            {xtype:'container',itemId:'selector_box', margin: 10 }
        ]},
        {xtype:'container',itemId:'display_box', margin: 5},
        {xtype:'tsinfolink'}
    ],
    launch: function() {
        this.down('#selector_box').add({
            xtype: 'rallycombobox',
            displayField: 'DisplayName',
            valueField: 'TypePath',
            fieldLabel: ' ',
            labelWidth: 5,
            width: 185,
            typeAhead: false,
            stateful: true,
            stateId: 'rally-technicalservices-estimate-pi-typepath',
            stateEvents: ['change'],
            storeConfig: {
                autoLoad: true,
                model: 'TypeDefinition',
                sorters: {
                    property: 'Ordinal',
                    direction: 'Desc'
                },
                filters: [
                    {
                        property: 'Parent.Name',
                        operator: '=',
                        value: 'Portfolio Item'
                    },
                    {
                        property: 'Creatable',
                        operator: '=',
                        value: 'true'
                    }
                    
                ]
            },
            listeners: {
                scope: this,
                change: function(type_box) {
                    if ( type_box && type_box.getRecord() ) {
                        var choice = type_box.getRecord();
                        var type = choice.get('TypePath');
                        type_box.setValue(choice);
                        this._showEstimateCardboard(type,this.down('#display_box'));
                    }
                }
            }
         });
        
    },
    _showEstimateCardboard: function(type, container) {
        this.logger.log("making cardboard for ", type);
        container.removeAll();
        
        container.add({
             xtype: 'rallycardboard',
             types: [type],
             attribute: 'PreliminaryEstimate'
        });        
    }
});