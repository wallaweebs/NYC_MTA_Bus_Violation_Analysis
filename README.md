# **Visualizations Final Project Proposal**

## **Project: NYC Bus Violations: How do bus lane violations vary by NYC neighborhood?**
**Team:** Team GOYAL

**Members:** Debasree Sen, Addina Rahaman, Sadeq Abubaker Alhanshali

**Dataset Used:** https://catalog.data.gov/dataset/mta-bus-automated-camera-enforcement-violations-beginning-october-2019

**GitHub Pages:** https://wallaweebs.github.io/NYC_MTA_Bus_Violation_Analysis/ 

## **Abstract**

Illegal bus lane violations is a major contributor to NYC traffic congestions. For an average New York City 
commuter, each bus lane violation can translate into increased delays and heightened stress levels. In recent years, 
the Metropolitan Transit Authority (MTA) has responded to this issue by launching Automated 
Camera Enforcement (ACE), a system which records bus lane violations along with their precise timestamp and geocoordinates. 
Our project proposes to use the ACE violation dataset and zero-in on 2025 violations to identify neighborhood-level and 
borough-level patterns. We will use the geocoordinates listed in the MTA's ACE violation dataset and aggregate
violations which fall within 1-kilometer buffer zones within the neighborhoods in monthly, quarterly, and 
hourly data. This can be used to visualize and draw conclusions about the state of neighborhood-wise and borough-wise 
bus lane violations. The central aim of this project is to provide insight on how the MTA and NYC authorities can 
prioritize enforcement resource allocation. Our dashboard will highlight which neighborhoods in which violations are
concentrated, how they evolve over time, and which areas would require early monitoring.

## **Primary Research Question**

Which New York City neighborhoods show persistent or emerging bus-lane violation hotspots, and how do these 
patterns change across time (monthly, quarterly, hourly) and boroughs?

## **Dataset Description**
**Records (Used)**: 2.5M
**Fields**:
- 'Violation ID'
- 'Vehicle ID'
- 'First Occurrence'
- 'Last Occurrence'
- 'Violation Status'
- 'Violation Type'
- 'Bus Route ID'
- 'Violation Latitude'
- 'Violation Longitude'
- 'Stop ID'
- 'Stop Name'
- 'Bus Stop Latitude'
- 'Bus Stop Longitude'
- 'Violation Georeference'
- 'Bus Stop Georeference'

## **Representative Neighborhoods (For this Project**
For this project, we will be looking at 30 neighborhoods across New York City:
- Astoria, Queens
- Bed-Stuy, Brooklyn
- Bensonhurst, Brooklyn
- Bushwick, Brooklyn
- Crown Heights, Brooklyn
- DUMBO, Brooklyn
- Downtown Brooklyn
- Elmhurst, Queens
- Flatbush, Brooklyn
- Flushing, Queens
- Fordham, The Bronx
- Harlem, Manhattan
- Howard Beach, Queens
- Hunts Point, The Bronx
- Jamaica Center, Queens
- Lower East Side, Manhattan
- Lower Manhattan
- Maspeth, QUeens
- Mid-Island / New Dorp, Staten Island
- Midtown, Manhattan
- Mott Haven, The Bronx
- Pelham Parkway, The Bronx
- Riverdale, The Bronx
- Soho / Greenwich Village, Manhattan
- South Bronx
- St. George, Staten Island
- Staten Island North Shore
- Upper East Side, Manhattan
- Upper West Side, Manhattan
- Williamsburg, Brooklyn

## **Proposed Dashboards**

### **1. Where Are the Worst Violation Hotspots?**
- Interactive heatmap (Kepler.gl)
- Quarterly violation buffers around neighborhoods

### **2. How Have Violations Changed Month-to-Month?**
- Interactive time-series line chart
- Filters: borough, neighborhood, violation type

### **3. Which Neighborhoods Deviate From Their Borough Norm?**
- Neighborhood comparison panel with bar charts
- Violations per quarter vs borough average

### **4. When During the Day Do Violations Occur?**
- Hour-of-day heatmap
- Day-of-week distribution

## **5. What are the Major Violation Types per Neighborhood?**
- Stack bar chart by neighborhood and violation type

## **Tools Used**
- **Data Preprocessing**: Python, pandas, geopandas
- **Interactive Visualizations**: React + Recharts
- **Static Visualizations**: Matplotlib + Seaborn
