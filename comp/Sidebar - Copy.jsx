
import { useEffect } from "react";
import ResizeSensor from "resize-sensor"


export default function Schart(props) {
    useEffect (()=>{

        const chart = window.LightweightCharts.createChart(document.querySelector(".chartt"),);
        const areaSeries = chart.addAreaSeries();

        new ResizeSensor(document.querySelector(".chartt"), event => {
            chart.resize(document.querySelector(".chartt").offsetWidth,document.querySelector(".chartt").offsetHeight, )
          })
     
          areaSeries.setData(props.data );



          const darkTheme = {
            chart: {
                layout: {
                    backgroundColor: '#2B2B43',
                    lineColor: '#2B2B43',
                    textColor: '#D9D9D9',
                },
                watermark: {
                    color: 'rgba(0, 0, 0, 0)',
                },
                crosshair: {
                    color: '#758696',
                },
                grid: {
                    vertLines: {
                        color: '#2B2B43',
                    },
                    horzLines: {
                        color: '#363C4E',
                    },
                },
            },
            series: {
                    topColor: 'rgba(32, 226, 47, 0.56)',
                    bottomColor: 'rgba(32, 226, 47, 0.04)',
                    lineColor: 'rgba(32, 226, 47, 1)',
            },
        };


          chart.applyOptions(darkTheme.chart);
          areaSeries.applyOptions(darkTheme.series); 
    },[])
 


return  (

<>


</>
)
 

    
}