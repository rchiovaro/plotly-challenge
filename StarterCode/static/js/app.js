function Plots(id) {
    d3.json("samples.json").then (sampledata =>{
        var IDs = sampledata.samples[0].otu_ids;
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        var OTUtop = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        var OTUid = OTUtop.map(d => "OTU " + d);
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        var trace= {
            x: sampleValues,
            y: OTUid,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        var data = [trace];

        var layout = {
            title: "OTU data",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    Plotly.newPlot("bar", data, layout);
        var trace2 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        var finalLayout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
 
        var finalData = [trace2];

    Plotly.newPlot("bubble", finalData, finalLayout); 
    
    });
}  

function demoInfo(id) {

    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;

        console.log(metadata)

       var result = metadata.filter(meta => meta.id.toString() === id)[0];
       var demographicInfo = d3.select("#sample-metadata");
        
       demographicInfo.html("");

        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

function dropdown(id) {
    Plots(id);
    demoInfo(id);
}


function init() {
    var dropdownMenu = d3.select("#selDataset");

    d3.json("samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");
        });

        Plots(data.names[0]);
        demoInfo(data.names[0]);
    });
}

init();
