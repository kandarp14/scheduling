// Simple list
//var list = document.getElementById("my-ui-list");
//Sortable.create(list); // That's all.
// Grouping
var foo = document.getElementById("foo");
Sortable.create(foo, {
    group: "omega1"
});
var bar = document.getElementById("bar");
Sortable.create(bar, {
    group: "omega2"
});
// Editable list
var items = new vis.DataSet({
    type: {
        start: 'ISODate'
        , end: 'ISODate'
    }
});
var tids = 1;
// add items to the DataSet
//items.add([
//    {
//        id: 1
//        , content: 'item 1<br>start'
//        , start: '2014-01-23'
//    }
//    , {
//        id: 2
//        , content: 'item 2'
//        , start: '2014-01-18'
//    }
//    , {
//        id: 3
//        , content: 'item 3'
//        , start: '2014-01-21'
//    }
//    , {
//        id: 4
//        , content: 'item 4'
//        , start: '2014-01-19'
//        , end: '2014-01-24'
//    }
//    , {
//        id: 5
//        , content: 'item 5'
//        , start: '2014-01-28'
//        , type: 'point'
//    }
//    , {
//        id: 6
//        , content: 'item 6'
//        , start: '2014-01-26'
//    }
//    ]);
var container = document.getElementById('visualization');
var options = {
    start: '2014-01-10'
    , end: '2014-02-10'
    , editable: true
    , showCurrentTime: true
};
var timeline = new vis.Timeline(container, items, options);
var its = document.getElementById('k_itms').getElementsByTagName('li');
for (var i = 0; i < its.length; i++) {
    var ok = its[i].innerText;
    its[i].setAttribute('draggable', true);
    its[i].addEventListener('dragstart', function (event) {
        var item = {
            content: this.innerText
        };
        event.dataTransfer.setData('text', JSON.stringify(item));
    });
}

function handleDragStart(event) {
    dragSrcEl = event.target;
    event.dataTransfer.effectAllowed = 'move';
    var itemType = event.target.innerHTML.split('-')[1].trim();
    var item = {
        id: new Date()
        , type: itemType
        , content: event.target.innerHTML.split('-')[0].trim()
    };
    var isFixedTimes = (event.target.innerHTML.split('-')[2] && event.target.innerHTML.split('-')[2].trim() == 'fixed times')
    if (isFixedTimes) {
        item.start = new Date();
        item.end = new Date(1000 * 60 * 10 + (new Date()).valueOf());
    }
    event.dataTransfer.setData("text", JSON.stringify(item));
}
// I try to add an Item but nothing happens. also the log message does not appear
function AddItem(item) {
    var length = 1;
    var j = 0;
    var id = tids++;
    //    var group = 03;
//    var start = options.start;
    var start = item.dt;
    var end = options.end;
    var content = item.content;
    for (; j < length;) {
        items.add([
            {
                id: id
                    //                , group: group
                    
                , start: start
                , content: content
            }
        , ]);
        //        items.remove(1);
        j++;
    }; // End For While Loop
}
var its1 = foo.getElementsByTagName('li');
var its2 = bar.getElementsByTagName('li');

function set_events(its) {
    for (var i = 0; i < its.length; i++) {
        its[i].addEventListener('dragend', function (e) {
            e = e || window.event;
            var dragX = e.pageX
                , dragY = e.pageY;
            var rect = container.getBoundingClientRect();
            //             console.log(rect.left, rect.right, rect.top, rect.bottom);
            //            console.log(dx, dy);
            //            console.log(dragX,dragY);
            if ((dragY >= rect.top) && (dragY <= rect.bottom) && (dragX >= rect.left) && (dragX <= rect.right)) {
                var item = {
                    content: this.innerText
                    , dt: options.start
                 };
                AddItem(item);
            }
        });
    }
}
set_events(its1);
set_events(its2);