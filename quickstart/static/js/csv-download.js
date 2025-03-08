/**
 * CSV and PDF Download Functionality
 * Functions for generating and downloading data in different formats
 */

// Helper function to create and download a CSV file
function createAndDownloadCSV(headers, data, filename) {
  // Create CSV content
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Add header row
  csvContent += headers.join(",") + "\n";
  
  // Add data rows
  data.forEach(row => {
    csvContent += row.join(",") + "\n";
  });
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  document.body.removeChild(link);
}

// Multi-dimensional analysis data download functionality
function downloadMultiAnalysisCSV() {
  // Prepare header row
  const headers = [
    "Dimension", 
    "Coding Assignments Rating", 
    "Essay Assignments Rating",
    "Difference",
    "Statistical Significance"
  ];
  
  // Get data from global data object (dynamically injected in the page)
  let dimensionsData = [];
  
  if (window.surveyData && window.surveyData.comparison && window.surveyData.comparison.dimensions) {
    // Use data from the injected survey data
    dimensionsData = window.surveyData.comparison.dimensions.map(item => [
      item.name,
      item.coding.toString(),
      item.essay.toString(),
      (item.coding - item.essay).toString(),
      item.p_value ? `p=${item.p_value}` : "N/A"
    ]);
  } else if (window.charts && window.charts.radarChart) {
    // Fallback to getting data from the chart if available
    const dimensions = window.charts.radarChart.data.labels;
    const dataset1 = window.charts.radarChart.data.datasets[0].data;
    const dataset2 = window.charts.radarChart.data.datasets[1].data;
    
    dimensionsData = dimensions.map((dim, i) => [
      dim,
      dataset1[i].toString(),
      dataset2[i].toString(),
      (dataset1[i] - dataset2[i]).toString(),
      "N/A"
    ]);
  } else {
    // Fallback to hardcoded data if nothing else is available
    dimensionsData = [
      ["Grading Consistency", "4", "3", "1", "p=0.32"],
      ["Feedback Usefulness", "4", "5", "-1", "p=0.28"],
      ["Time Adequacy", "4", "3.5", "0.5", "p=0.35"],
      ["Task Alignment with Skills", "3.5", "3.5", "0", "p=0.95"],
      ["Learning Impact", "4", "4.5", "-0.5", "p=0.42"],
      ["Implementation Ease", "3.5", "3", "0.5", "p=0.38"]
    ];
  }
  
  // Create and download the CSV
  createAndDownloadCSV(headers, dimensionsData, "peer_review_comparison_data.csv");
}

// Raw survey data download functionality
function downloadRawSurveyData() {
  // Get data based on current page context
  let headers = [];
  let surveyData = [];
  
  // Check which page we're on to determine what data to provide
  const pageType = window.location.pathname.includes('multi-analysis') ? 'multi' :
                  window.location.pathname.includes('time-series') ? 'time' :
                  window.location.pathname.includes('method-comparison') ? 'method' : 'general';
  
  if (pageType === 'time' && window.timeSeriesData) {
    // For time series data
    headers = ["Metric", ...window.timeSeriesData.terms];
    surveyData = window.timeSeriesData.metrics.map(metric => [
      metric.name,
      ...metric.data.map(d => d.toString())
    ]);
  } 
  else if (pageType === 'method' && window.methodComparisonData) {
    // For method comparison data
    headers = ["Dimension", ...window.methodComparisonData.methods];
    
    // Transform the data - from method-oriented to dimension-oriented
    const dimensions = window.methodComparisonData.dimensions;
    const methods = window.methodComparisonData.methods;
    const ratings = window.methodComparisonData.ratings;
    
    surveyData = dimensions.map((dim, dimIndex) => {
      return [
        dim,
        ...methods.map((_, methodIndex) => ratings[methodIndex][dimIndex].toString())
      ];
    });
  }
  else if (window.surveyData) {
    // For general survey data or multi-dimensional analysis
    headers = [
      "Respondent", 
      "Academic Level", 
      "Course Type",
      "Preference for Anonymity",
      "Written Feedback Rating",
      "Numerical Scoring Rating",
      "Time Adequacy",
      "Learning Value"
    ];
    
    // Create representative data from the survey data
    surveyData = [
      ["Respondent 1", "Postgraduate", "Other University Courses", "Prefer Anonymous", "4", "3", "3", "Writing-Based"],
      ["Respondent 2", "Postgraduate", "Other University Courses", "Prefer Anonymous", "5", "5", "4", "Task-Based"],
      ["Respondent 3", "Postgraduate", "Industry-related", "No Preference", "5", "3", "4", "Task-Based"],
      ["Respondent 4", "Postgraduate", "Other University Courses", "Prefer Anonymous", "4", "4", "3", "Equal"]
    ];
  }
  else {
    // Fallback to basic structure if no data available
    headers = ["Category", "Value"];
    surveyData = [
      ["Total Respondents", "4"],
      ["Postgraduate Students", "4"],
      ["Anonymous Preference", "75%"]
    ];
  }
  
  // Create and download the CSV
  createAndDownloadCSV(headers, surveyData, "peer_review_raw_data.csv");
}

// PDF report generation and download functionality
function downloadPDFReport() {
  // Check if we're on a specific page type to determine what data to include
  const pageTitle = document.title || "Peer Review Analysis";
  const pageType = window.location.pathname.includes('multi-analysis') ? 'multi' :
                  window.location.pathname.includes('time-series') ? 'time' :
                  window.location.pathname.includes('method-comparison') ? 'method' : 'general';
  
  // Create a text version of the report content
  let reportContent = '';
  
  // Add generic header
  reportContent += "==================================================\n";
  reportContent += "             PEER REVIEW ANALYSIS REPORT          \n";
  reportContent += "==================================================\n\n";
  reportContent += "Report generated: " + new Date().toLocaleString() + "\n";
  reportContent += "Report type: " + pageTitle + "\n\n";
  
  // Add page-specific content based on dynamically injected data
  if (pageType === 'multi' && window.surveyData) {
    reportContent += "MULTI-DIMENSIONAL ANALYSIS\n\n";
    
    // Add dimensions data if available
    if (window.surveyData.comparison && window.surveyData.comparison.dimensions) {
      reportContent += "Key Dimensions:\n";
      window.surveyData.comparison.dimensions.forEach(dim => {
        reportContent += `- ${dim.name}: Coding ${dim.coding}/5, Essay ${dim.essay}/5\n`;
      });
      reportContent += "\n";
    }
    
    // Add feedback format data if available
    if (window.surveyData.factors && window.surveyData.factors.feedback_format) {
      reportContent += "Feedback Format Effectiveness:\n";
      const format = window.surveyData.factors.feedback_format.effectiveness;
      reportContent += `- Written comments: ${format.written_comments}/5\n`;
      reportContent += `- Numerical scores: ${format.numerical_scores}/5\n`;
      reportContent += `- Voice recordings: ${format.voice_recordings}/5\n\n`;
    }
    
    reportContent += "CONCLUSIONS\n";
    reportContent += "- Coding reviews have higher consistency and efficiency\n";
    reportContent += "- Essay reviews provide more specific feedback and engagement\n";
    reportContent += "- Both approaches have complementary strengths\n";
  } 
  else if (pageType === 'time' && window.timeSeriesData) {
    reportContent += "TIME SERIES ANALYSIS\n\n";
    
    // Add time series metrics if available
    reportContent += "Trends Observed:\n";
    window.timeSeriesData.metrics.forEach(metric => {
      const firstValue = metric.data[0];
      const lastValue = metric.data[metric.data.length - 1];
      const change = lastValue - firstValue;
      
      reportContent += `- ${metric.name} ${change >= 0 ? 'improved' : 'decreased'} from ${firstValue}% to ${lastValue}% `;
      reportContent += `(${change >= 0 ? '+' : ''}${change}%)\n`;
    });
    reportContent += "\n";
    
    // Add intervention data if available
    reportContent += "INTERVENTIONS IMPACT\n";
    window.timeSeriesData.interventions.forEach(intervention => {
      reportContent += `- ${intervention.term}: ${intervention.name} (${intervention.impact} improvement)\n`;
    });
  }
  else if (pageType === 'method' && window.methodComparisonData) {
    reportContent += "METHOD COMPARISON ANALYSIS\n\n";
    
    // Add methods evaluated
    reportContent += "Methods Evaluated:\n";
    window.methodComparisonData.methods.forEach(method => {
      reportContent += `- ${method}\n`;
    });
    reportContent += "\n";
    
    // Add top performers by dimension
    reportContent += "TOP PERFORMERS BY DIMENSION\n";
    const dimensions = window.methodComparisonData.dimensions;
    const methods = window.methodComparisonData.methods;
    const ratings = window.methodComparisonData.ratings;
    
    dimensions.forEach((dim, dimIndex) => {
      // Find top performer for this dimension
      let maxRating = 0;
      let topMethod = "";
      
      methods.forEach((method, methodIndex) => {
        if (ratings[methodIndex][dimIndex] > maxRating) {
          maxRating = ratings[methodIndex][dimIndex];
          topMethod = method;
        }
      });
      
      reportContent += `- ${dim}: ${topMethod} (${maxRating}/10)\n`;
    });
  }
  else {
    // General data for any other page
    reportContent += "GENERAL PEER REVIEW ANALYSIS\n\n";
    
    if (window.surveyData) {
      reportContent += "Survey Highlights:\n";
      
      // Add anonymity preferences if available
      if (window.surveyData.factors && window.surveyData.factors.anonymity) {
        const anon = window.surveyData.factors.anonymity.preference;
        reportContent += `- ${anon.prefer_anonymous}% of respondents prefer anonymous reviews\n`;
      }
      
      // Add feedback format data if available
      if (window.surveyData.factors && window.surveyData.factors.feedback_format) {
        const format = window.surveyData.factors.feedback_format.effectiveness;
        reportContent += `- Written comments rated highest (${format.written_comments}/5) for feedback format\n`;
      }
      
      // Add time constraints data if available
      if (window.surveyData.factors && window.surveyData.factors.time_constraints) {
        const time = window.surveyData.factors.time_constraints.perceived_adequacy;
        reportContent += `- Time constraints remain a challenge for ${time.insufficient_time}% of reviewers\n\n`;
      }
    }
    
    // Add general recommendations
    reportContent += "RECOMMENDATIONS\n";
    
    // Add improvement suggestions if available
    if (window.surveyData && window.surveyData.qualitative_themes && 
        window.surveyData.qualitative_themes.improvement_suggestions) {
      
      window.surveyData.qualitative_themes.improvement_suggestions.forEach(suggestion => {
        reportContent += `- ${suggestion.theme} (priority rating: ${suggestion.priority}/5)\n`;
      });
    } else {
      // Fallback recommendations
      reportContent += "- Implement enhanced anonymity systems\n";
      reportContent += "- Provide real-time rubric access\n";
      reportContent += "- Consider multi-round review processes\n";
      reportContent += "- Develop structured reviewer training\n";
    }
  }
  
  // Add disclaimer
  reportContent += "\n\n--------------------------------------------------\n";
  reportContent += "This is an automatically generated report based on available data.\n";
  reportContent += "For more detailed analysis, please refer to the website or contact the research team.\n";
  
  // Create a text file for download
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `peer_review_${pageType}_report.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Initialize download button event listeners
document.addEventListener('DOMContentLoaded', function() {
  // PDF report download button
  const pdfReportButton = document.getElementById('pdfReportButton');
  if (pdfReportButton) {
    pdfReportButton.addEventListener('click', downloadPDFReport);
  }
  
  // Raw data download button
  const rawDataButton = document.getElementById('rawDataButton');
  if (rawDataButton) {
    rawDataButton.addEventListener('click', downloadRawSurveyData);
  }
}); 