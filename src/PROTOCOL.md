# AION Dashboard Data Protocol

To update the dashboard, please provide data in the following JSON format. The system will automatically extract and render it according to the standardized UI design.

## Data Structure (JSON)

```json
{
  "date": "YYYY-MM-DD",
  "version": "vX.X",
  "keyStats": [
    { "label": "Stat Label", "value": "Value", "unit": "Unit", "color": "HexColor" }
  ],
  "warPhase": {
    "level": "Phase X",
    "targetLevel": "Phase Y",
    "title": "Phase Title",
    "subTitle": "Phase Subtitle",
    "points": ["Point 1", "Point 2"],
    "note": "Summary Note"
  },
  "riskScore": 86,
  "prevRiskScore": 95,
  "keyChange": "Description of the most critical change",
  "investmentSignal": "Market analysis and investment guidance",
  "scoreTrend": [
    { "date": "MM-DD", "score": 80 },
    { "date": "MM-DD", "score": 86, "active": true }
  ],
  "riskFactors": [
    {
      "name": "Factor Name",
      "score": 4.5,
      "prev": 5.0,
      "weight": 0.25,
      "description": "Details about the factor",
      "status": "NORMAL | AT CEILING | FAST | SLOW",
      "change": "up | down | structural"
    }
  ],
  "events": [
    {
      "id": "EVT-XX",
      "title": "Event Title",
      "description": "Event Details",
      "verification": "confirmed | partial | single",
      "timestamp": "YYYY-MM-DD",
      "significance": "Strategic impact",
      "highlight": true
    }
  ],
  "situations": [
    {
      "title": "Category Title",
      "icon": "Military | Shipping | Energy | Leadership",
      "tag": "Status Tag",
      "tagColor": "red | yellow | orange | green",
      "points": ["Point 1", "Point 2"]
    }
  ],
  "coreContradiction": {
    "political": ["Point 1"],
    "military": ["Point 1"]
  }
}
```

## Extraction Logic
- **Layout**: Fixed 4-column top stats, 2-column main area (Risk Gauge + War Phase), and 3-tab detailed view.
- **UI Design**: High-contrast "AION" aesthetic with neon accents and theme-aware colors.
- **Multi-language**: Provide both `DATA_ZH` and `DATA_EN` objects to support the language switcher.
