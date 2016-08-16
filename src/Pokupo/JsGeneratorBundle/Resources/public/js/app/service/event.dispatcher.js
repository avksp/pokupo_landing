var EventDispatcher = {
    events : [],

    AddEventListener : function (event, callback) {
        this.events[event] = this.events[event] || [];
        if (this.events[event]) {
            this.RemoveEventListener(event, callback);
            this.events[event].push(callback);
        }
    },
    RemoveEventListener : function (event, callback) {
        if (this.events[event]) {
            var listeners = this.events[event];
            var callbackHash = EventDispatcher.HashCode(callback.toString());
            for (var i = listeners.length - 1; i >= 0; --i) {
                if (EventDispatcher.HashCode(listeners[i].toString()) === callbackHash) {
                    listeners.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    },
    DispatchEvent: function (event, data) {
        if (this.events[event]) {
            var listeners = this.events[event], len = listeners.length;
            while (len--) {
                listeners[len](data);   //callback with self
            }
        }
    },
    HashCode : function(str){
        var hash = 0, i, ch;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+ch;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}