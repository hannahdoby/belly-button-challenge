// read in samples.json with d3
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get the data with d3.
d3.json(url).then(function(data) {
  console.log(data);
});

// Create a horizontal bar chart with a dropdown menu 
// to display the top 10 OTUs found in that individual
function init() {
  let dropdownMenu = d3.select("#selDataset");
  const names = data.names;
  names.forEach(id => {
    console.log(id);
    dropdownMenu.append("option").text(id).property("value", id);
  });

  const firstSample = names[0];

  console.log(firstSample);

  buildBarChart(firstSample);
  buildBubbleChart(firstSample);
  buildMetadata(firstSample);

};

const samples = data.samples;
const metadata = data.metadata;

function buildBarChart(sample) {
  let sampleValues = samples.filter(sampleObj => sampleObj.id === sample)[0].sample_values.slice(0,10).reverse();
  let otuIds = samples.filter(sampleObj => sampleObj.id === sample)[0].otu_ids.slice(0,10).reverse();
  let otuLabels = samples.filter(sampleObj => sampleObj.id === sample)[0].otu_labels.slice(0,10).reverse();

  let trace = {
    x: sampleValues,
    y: otuIds.map(otuId => `OTU ${otuId}`),
    text: otuLabels,
    type: "bar",
    orientation: "h"
  };

  let data = [trace];

  let layout = {
    title: "Top 10 OTUs"
  };

  Plotly.newPlot("bar", data, layout);
}

// Create a bubble chart that displays each sample
function buildBubbleChart(sample) {
  let sampleValues = samples.filter(sampleObj => sampleObj.id === sample)[0].sample_values;
  let otuIds = samples.filter(sampleObj => sampleObj.id === sample)[0].otu_ids;
  let otuLabels = samples.filter(sampleObj => sampleObj.id === sample)[0].otu_labels;

  let trace = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: "markers",
    marker: {
      size: sampleValues,
      color: otuIds
    }
  };

  let data = [trace];

  let layout = {
    title: "OTU ID"
  };

  Plotly.newPlot("bubble", data, layout);
}

// Display the sample metadata, i.e., an individual's demographic information
function buildMetadata(sample) {
  let panel = d3.select("#sample-metadata");
  panel.html("");
  let metadata = samples.filter(sampleObj => sampleObj.id === sample)[0];
  Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
}

// Update all the plots when a new sample is selected
function optionChanged(newSample) {
  buildBarChart(newSample);
  buildBubbleChart(newSample);
  buildMetadata(newSample);
}



