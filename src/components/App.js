import React from 'react';
import * as d3 from 'd3';

import './App.css';

class App extends React.Component {

    componentDidMount() {
        let req = new XMLHttpRequest();
        let dataURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
        req.open("GET", dataURL, true);
        req.send();
        req.onload = () => {
            let json = JSON.parse(req.responseText);
            const data = json.map( (entry) => {
                let minutes = Math.floor(entry.Seconds / 60);
                let seconds = entry.Seconds % 60;
                let time = new Date();
                time.setMinutes(minutes);
                time.setSeconds(seconds);
                let year = new Date('January 1, 1960 00:00:00');
                year.setFullYear(entry.Year);
                return { name: entry.Name, country: entry.Nationality,
                         time: time, seconds: entry.Seconds,
                         year: year, doping: (entry.Doping==="" ? 0 : 1),
                         dopingText: entry.Doping }
            });

            const width = 900;
            const height = 600;
            const padding = 60;
            const doping_color = "#ff5252"
            const no_doping_color = "#607d8b"

            // set xScale to cover the years
            let firstYear = new Date(d3.min(data, (d) => d.year));
            let lastYear = new Date(d3.max(data, (d) => d.year));
            firstYear.setFullYear(firstYear.getFullYear() - 1);
            lastYear.setFullYear(lastYear.getFullYear() + 1);
            const xScale = d3.scaleTime()
                             .domain([firstYear, lastYear])
                             .range([padding, width - padding]);

            // set yScale to cover the times
            let lowestTime = new Date((d3.min(data, (d) => d.time)).getTime());
            let highestTime = new Date((d3.max(data, (d) => d.time)).getTime());
            lowestTime.setSeconds(lowestTime.getSeconds() - 15);
            highestTime.setSeconds(highestTime.getSeconds() + 15);
            const yScale = d3.scaleTime()
                             .domain([highestTime, lowestTime])
                             .range([height - padding, padding]);

            // define the axes
            const xAxis = d3.axisBottom(xScale);
            const yAxis = d3.axisLeft(yScale)
                            .tickFormat(d3.timeFormat("%M:%S"));
            
            // define the main svg
            const svg = d3.select("#chart")
                          .append("svg")
                          .attr("preserveASpectRatio", "xMinYMin meet")
                          .attr("viewBox", "0 0 " + width + " " + height)
                          .attr("id", "chart-content");

            // define the tooltip object
            const tooltip = d3.select("#chart")
                          .append("div")
                          .attr("class", "tooltip")
                          .attr("id","tooltip")
                          .style("opacity",0);

            // add the datapoints
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class","dot")
                .attr("data-xvalue", (d)=> d.year)
                .attr("data-yvalue", (d)=> d.time)
                .attr("r", 5)
                .attr("cx", (d) => xScale(d.year))
                .attr("cy", (d) => yScale(d.time))
                .attr("fill", (d) => (d.doping ? doping_color : no_doping_color) )
                .on("mouseover", (d,i) => {
                    tooltip.transition()
                           .duration(200)
                           .style('opacity',.9);
                     tooltip.html(`<strong>` + d.name + `</strong><br>
                                   <strong>Time: </strong>` + d.time.getMinutes() + ":" + d.time.getSeconds() + 
                                   `<br><strong>Country: </strong>` + d.country +
                                   `<br>` + ((d.doping) ? d.dopingText : ""))
                            .style('left', (padding + xScale(d.year)) + "px")
                            .style('top', yScale(d.time) + "px")
                            .attr("data-year", d.year);
                })
                .on('mouseout', (d) => {
                    tooltip.transition()
                           .duration(200)
                           .style('opacity',0);
                })

            svg.append("text")
               .attr("x", (width/2))
               .attr("y", padding / 2)
               .attr("text-anchor", "middle")
               .attr("font-size", "24px")
               .attr("id","title")
               .text("Doping in Professional Cycling");

            svg.append("text")
               .attr("x", (width/2))
               .attr("y", (padding / 2) + 30)
               .attr("text-anchor", "middle")
               .attr("font-size", "18px")
               .text("35 Fastest Times Up the Alpe D'Huez");

            svg.append("g")
               .attr("transform", "translate(0," + (height - padding) + ")")
               .attr("id", "x-axis")
               .call(xAxis);

            svg.append("g")
               .attr("transform", "translate(" + padding + ", 0)")
               .attr("id","y-axis")
               .call(yAxis);
            
            // handmade legend
            const legend_x = width - padding - 120;
            const legend_y = padding + 50;
            svg.append("rect").attr("x", legend_x-20).attr("y", legend_y-40).attr("width",140).attr("height", 80).style("fill","lightgray").attr("id","legend")
            svg.append("text").attr("x",legend_x - 6).attr("y", legend_y-16).text("legend:")
            svg.append("circle").attr("cx",legend_x).attr("cy",legend_y).attr("r",6).style("fill", doping_color)
            svg.append("circle").attr("cx",legend_x).attr("cy",legend_y + 20).attr("r",6).style("fill", no_doping_color)
            svg.append('text').attr("x",legend_x + 12).attr("y",legend_y + 4).text("doping")
            svg.append('text').attr("x",legend_x + 12).attr("y",legend_y + 20 + 4).text("no doping")
        }
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui segment" id="chart-container">
                    <div id="chart"></div>
                </div>
            </div>
        );
    }
};

export default App;