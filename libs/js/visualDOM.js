var names = {};
var show = false;
// Walk the DOM, starting at document, and return an Array of node data objects representing the DOM tree
  // Typical usage: traverseDom(document.activeElement)
  // The second and third arguments are internal, used when recursing through the DOM
  function traverseDom(node, parentName, dataArray) {
    if (parentName === undefined) parentName = null;
    if (dataArray === undefined) dataArray = [];
    // skip everything but HTML Elements
    if (!(node instanceof Element)) return;
    // Ignore the navigation menus
    if (node.id === "navindex" || node.id === "navtop") return;
    // add this node to the nodeDataArray
    if (node.id === "diVisualDOM" || node.id === "btnvisualDOM") return;
    var name = getName(node);
    var data = { key: name, name: name };
    dataArray.push(data);
    // add a link to its parent
    if (parentName !== null) {
      data.parent = parentName;
    }
    // find all children
    var l = node.childNodes.length;
    for (var i = 0; i < l; i++) {
      traverseDom(node.childNodes[i], name, dataArray);
    }
    return dataArray;
  }

  // Give every node a unique name
  function getName(node) {
    var n = node.nodeName;
    if (node.id) n = n + " #" + node.id;
    var namenum = n;  // make sure the name is unique
    var i = 1;
    while (names[namenum] !== undefined) {
      namenum = n + i;
      i++;
    }
    names[namenum] = node;
    return namenum;
  }

  // When a Node is selected, highlight the corresponding HTML element.
  function nodeSelectionChanged(node) {
    if (node.isSelected) {
      names[node.data.name].style.backgroundColor = "lightblue";
    } else {
      names[node.data.name].style.backgroundColor = "";
    }
  }

var drawVisualDOM = function(){

   if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "diVisualDOM",
        {
          initialAutoScale: go.Diagram.UniformToFill,
          // define the layout for the diagram
          layout: $(go.TreeLayout, { nodeSpacing: 5, layerSpacing: 30 })
        });

    // Define a simple node template consisting of text followed by an expand/collapse button
    myDiagram.nodeTemplate =
      $(go.Node, "Horizontal",
        { selectionChanged: nodeSelectionChanged },  // this event handler is defined below
        $(go.Panel, "Auto",
          $(go.Shape, { fill: "#1F4963", stroke: null }),
          $(go.TextBlock,
            { font: "bold 13px Helvetica, bold Arial, sans-serif",
              stroke: "white", margin: 3 },
            new go.Binding("text", "key"))
        ),
        $("TreeExpanderButton")
      );

    // Define a trivial link template with no arrowhead.
    myDiagram.linkTemplate =
      $(go.Link,
        { selectable: false },
        $(go.Shape));  // the link shape

    // create the model for the DOM tree
    myDiagram.model =
      $(go.TreeModel, {
        isReadOnly: true,  // don't allow the user to delete or copy nodes
        // build up the tree in an Array of node data
        nodeDataArray: traverseDom(document.body)
      });
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-//
//  visualDOM function
//----------------------------------------------------//

$(document).on("click","#btnvisualDOM",function(){
   if(show){
      window.location.reload();
      show = false;
   }else{
      $("#btnvisualDOM").text("Ocultar VisualDOM");
      drawVisualDOM();
      $("#diVisualDOM").show();
      show = true;
   }

})
