import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Plotly?: any;
  }
}

export interface PlotlyChartProps {
  data: any[];
  layout?: Record<string, any>;
  config?: Record<string, any>;
  className?: string;
  style?: React.CSSProperties;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({
  data,
  layout = {},
  config = {},
  className = 'w-full h-80',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const renderChart = () => {
      if (!window.Plotly) {
        console.warn('Plotly.js is still loading...');
        return;
      }

      // Default dark theme styling matching app design
      const mergedLayout = {
        autosize: true,
        paper_bgcolor: 'rgba(15, 23, 42, 0)',
        plot_bgcolor: 'rgba(2, 6, 23, 0.4)',
        font: {
          family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#94a3b8',
          size: 11,
        },
        margin: { l: 55, r: 40, t: 45, b: 45 },
        hovermode: 'closest',
        xaxis: {
          gridcolor: 'rgba(51, 65, 85, 0.35)',
          zerolinecolor: 'rgba(71, 85, 105, 0.5)',
          tickfont: { color: '#94a3b8', size: 10 },
          ...layout.xaxis,
        },
        yaxis: {
          gridcolor: 'rgba(51, 65, 85, 0.35)',
          zerolinecolor: 'rgba(71, 85, 105, 0.5)',
          tickfont: { color: '#94a3b8', size: 10 },
          ...layout.yaxis,
        },
        legend: {
          orientation: 'h',
          yanchor: 'bottom',
          y: 1.02,
          xanchor: 'right',
          x: 1,
          font: { color: '#cbd5e1', size: 10.5 },
          bgcolor: 'rgba(15, 23, 42, 0.6)',
          bordercolor: 'rgba(51, 65, 85, 0.5)',
          borderwidth: 1,
          ...layout.legend,
        },
        ...layout,
      };

      const mergedConfig = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['lasso2d', 'select2d'],
        toImageButtonOptions: {
          format: 'png',
          filename: 'cpcb_telemetry_plot',
          height: 500,
          width: 800,
          scale: 2,
        },
        ...config,
      };

      window.Plotly.newPlot(el, data, mergedLayout, mergedConfig);
    };

    if (window.Plotly) {
      renderChart();
    } else {
      // Poll briefly if script is still downloading from CDN
      const interval = setInterval(() => {
        if (window.Plotly) {
          clearInterval(interval);
          renderChart();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    const handleResize = () => {
      if (el && window.Plotly) {
        window.Plotly.Plots.resize(el);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (el && window.Plotly) {
        window.Plotly.purge(el);
      }
    };
  }, [data, layout, config]);

  return <div ref={containerRef} className={className} style={style} />;
};
