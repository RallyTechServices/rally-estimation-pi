Ext.override(Rally.ui.combobox.ComboBox,{
    doLocalQuery: function(queryPlan) {
        var me = this,
            queryString = queryPlan.query;

        // Create our filter when first needed
        if (!me.queryFilter) {
            // Create the filter that we will use during typing to filter the Store
//            me.queryFilter = new Ext.util.Filter({
//                id: me.id + '-query-filter',
//                anyMatch: me.anyMatch,
//                caseSensitive: me.caseSensitive,
//                root: 'data',
//                property: me.displayField
//            });
            me.store.addFilter(me.queryFilter, false);
        }

        // Querying by a string...
        if (queryString || !queryPlan.forceAll) {
            me.queryFilter.disabled = false;
            me.queryFilter.setValue(me.enableRegEx ? new RegExp(queryString) : queryString);
        }

        // If forceAll being used, or no query string, disable the filter
        else {
            if ( me.queryFilter ) {
                me.queryFilter.disabled = true;
            }
        }

        // Filter the Store according to the updated filter
        me.store.filter();

        // Expand after adjusting the filter unless there are no matches
        if (me.store.getCount()) {
            me.expand();
        } else {
            me.collapse();
        }

        me.afterQuery(queryPlan);
    }
});