//use d3 to select elements
var selector = d3.select("#selDataset")
var demoInfo = d3.select("#sample-metadata")


d3.json("samples.json").then((data) => {
  var idNum = data.names;
  var metadata = data.metadata;
  var samples = data.samples;
  console.log(idNum);
  console.log(metadata)
  console.log(samples)
  
  

  //fill the demographic information with the first sample
  demoInfo.html("");
  Object.entries(metadata[0]).forEach(function([key, value]){
    demoInfo.append("p").text(`${key}: ${value}`)
  });

  initBarChart(samples[0])
  initializeBubbleChart(samples[0]);

  //fill the dropdown menu with 
  idNum.forEach(function(subject, index){
    var subjectSelection = selector.append("option")
    subjectSelection.attr("value", index).text(subject)
  });
  
  

  selector.on("change",updateChart);

  function updateChart(event){
    var selectValues = selector.property("value");
    demoInfo.html("");
    Object.entries(metadata[selectValues]).forEach(function([key, value]){
        demoInfo.append("p").text(`${key}: ${value}`)
      });

    updateBarChart(samples[selectValues]);
    updateBubbleChart(samples[selectValues]);
    // updateGauge(metadata[selectValues]);
  };

  function initBarChart(selectedsubjectID){
    // Display the first 10 OTUs found in that individual. I can't figure out how to combine 
    // these into a bunch of records/objects/whatever to do a proper sort.
    var barLabels = selectedsubjectID.otu_ids.slice(0,10);
    var barValues = selectedsubjectID.sample_values.slice(0,10);
    var barText = selectedsubjectID.otu_labels.slice(0,10);
    
    var barChartData = {
        x : barValues.reverse(),
        y : barLabels.map(data=>`OTU-${data}`).reverse(),
        text: barText.reverse(),
        type : "bar",
        orientation : "h"
    };
    
    var bar_data = [barChartData];
    var layout = {
        title: `Top 10 Microbial Species Found`,
        xaxis:{title:"Amount Found"},
        yaxis:{title: "OTU ID"}
    };
    var config = {responsive: true};
    Plotly.newPlot("bar", bar_data, layout, config);
  };

  function updateBarChart(selectedSubjectID){
    var barLabels = selectedSubjectID.otu_ids.slice(0,10);
    var barValues = selectedSubjectID.sample_values.slice(0,10);
    var barText = selectedSubjectID.otu_labels.slice(0,10);
    var update = { title: `Top 10 Microbial Species Found`};

    Plotly.restyle("bar","x",[barValues.reverse()]);
    Plotly.restyle("bar","y",[barLabels.map(data=>`OTU-${data}`).reverse()]);
    Plotly.restyle("bar","text",[barText.reverse()]);
    Plotly.relayout("bar",update)
  };

  function initializeBubbleChart(selectedSubjectID){
    var bubbleOtuID = selectedSubjectID.otu_ids;
    var bubbleValues = selectedSubjectID.sample_values;
    var bubbleLabels = selectedSubjectID.otu_labels;
    
    var trace = {
        x : bubbleOtuID,
        y : bubbleValues,
        mode: "markers",
        marker: {
            color: bubbleOtuID,
            colorscale: "Rainbow",
            size: bubbleValues
        },
        text: bubbleLabels
    };

    var layout = {
        width:"1100",
        height: "600",
        title: `<b>Microbial Species Found Per Sample</b>`,
        showlegend: false, xaxis:{title:"OTU ID"},
        yaxis:{title: "Amount Per Sample"}
    };

    var bubble_data = [trace];
    var config = {responsive: true};
    Plotly.newPlot("bubble",bubble_data,layout,config);
};

function updateBubbleChart(selectedSubjectID){
    var bubbleOtuID = selectedSubjectID.otu_ids;
    var bubbleValues = selectedSubjectID.sample_values;
    var bubbleLabels = selectedSubjectID.otu_labels;
    var update = {title: `<b>Microbial Species Found Per Sample</b>`};
    
    Plotly.restyle("bubble","x",[bubbleOtuID]);
    Plotly.restyle("bubble","y",[bubbleValues]);
    Plotly.restyle("bubble","marker",[{
        size: bubbleValues,
        color: bubbleOtuID,
        colorscale: "Rainbow"}
    ]),
    Plotly.restyle("bubble","text",[bubbleLabels]);
    Plotly.relayout("bubble",update);
  };
})
//initialize values for first entry
// d3.json("samples.json").then((data) => {
//   var rows = [];
//   for (var i = 0; i < data.metadata.length; i++) {
//     // var selection = d3.select("#selDataset").selectAll("")
//     rows.push(data.metadata[i].id);
//   }
//   console.log(rows)

// });

//   var selection = d3.select("#content").selectAll(".temps")
//         .data(data);

//   selection.enter()
//         .append("div")
//         .classed("temps", true)
//         .merge(selection)
//         .style("height", function(d) {
//           return d + "px";
//         });

//initialize function

// function init(){
//   var id = 940;
//   create_bar_graph(id);
//   d3.json("samples.json").then((data) => {
//     var id = data.metadata
    

//     console.log(id)
//     console.log(data.metadata[0])


//   }
  
//   )

  
//   //also populate dropdown menu do another d3.jason call to get dropdown menu ids
// }

// function create_bar_graph(selected_person) {

//   d3.json("samples.json").then((data) => {
//     // if data is top ten then put into x variables and y variables

//     var id = data.metadata;
//     const result = id.filter(person => person.id == selected_person)
//     // console.log(id_num);
//     console.log(result[0])
//     var values = data.samples[0].sample_values;
//     var labels = data.samples[0].otu_ids;
//     // var values2 = parseInt(values);
//     for(var i=0; i<values.length;i++) values[i] = parseInt(values[i], 10);
//     // var values2 = values.sort()
//     // var values3 = parseInt(values2)
//     // var integer = parseInt(text, 10);
//     // x_values = values.sort();
//     x_values = values.slice(0,10)
//     // x_values = values
//     // console.log(x_values)
//     // for(var j=0; i<x_values.length;j++) {
//     //   if (data.samples[0].sample_values[j] === x_values
//     //   )}
//     // console.log(values2)
//   // console.log(labels)
//     var trace1 = {
//       x: x_values,
//       y: labels,
//       type: "bar",
//       orientation: 'h'
//     };
//     var data = [trace1];
    
//     var layout = {
//       title: "Bar Chart",
//       xaxis: {title: "Bacteria"},
//       yaxis: {title: "amount"}
//     };

//     Plotly.newPlot("bar", data, layout);
//   });
// };

// init();
// //   // Part 1
// // var trace1 = {
// //   x: ["beer", "wine", "martini", "margarita",
// //     "ice tea", "rum & coke", "mai tai", "gin & tonic"],
// //   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
// //   type: "bar"
// // };

// // var data = [trace1];

// // var layout = {
// //   title: "'Bar' Chart",
// //   xaxis: {title: "Bacteria"},
// //   yaxis: {title: "amount"}
// // };

// // Plotly.newPlot("bar", data, layout);

// // d3.json("data/data.json").then((data) => {
// //   //  Create the Traces
// //   var trace1 = {
// //     x: data.organ,
// //     y: data.survival.map(val => Math.sqrt(val)),
// //     type: "box",
// //     name: "Cancer Survival",
// //     boxpoints: "all"
// //   };

// //   // Create the data array for the plot
// //   var data = [trace1];

// //   // Define the plot layout
// //   var layout = {
// //     title: "Square Root of Cancer Survival by Organ",
// //     xaxis: { title: "Organ" },
// //     yaxis: { title: "Square Root of Survival" }
// //   };

// //   // Plot the chart to a div tag with id "plot"
// //   Plotly.newPlot("bar", data, layout);
// // });