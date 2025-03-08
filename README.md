# Breakpoint Enhancer for Visual Studio Code

Enhance your debugging experience in Visual Studio Code with improved breakpoint visibility and customization. This extension highlights the entire line when a breakpoint is added, ensuring clear visual cues. Users can customize the highlight color, text color, and icon size to match their preferences for a more personalized and efficient debugging workflow.

## Features

- **Highlighted Breakpoint Lines**:  
  Breakpoint lines are highlighted with a semi-transparent background color for better visibility.
- **Customizable Gutter Icons**:  
  Replace the default small breakpoint dots with larger, clearer indicators.
- **Theme Compatibility**:  
  Works seamlessly with both dark and light themes.
- **Real-Time Updates**:  
  Changes reflect immediately as you add/remove breakpoints.
- **Customizable Colors**:  
  Configure the highlight color and icon appearance via VS Code settings.

## Installation

1. Open **Visual Studio Code**.
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for "Breakpoint Enhancer".
4. Click **Install**.
5. Reload VS Code when prompted.

## Extension Settings

Add these settings to your `settings.json`:

```json
{
  "breakpointEnhancer.highlightColor": "rgba(255,0,0,0.2)",
  "breakpointEnhancer.textHighlightColor": "#FFFFFF",
  "breakpointEnhancer.indicatorSize": 14
}
```
Or you can change it directly from Settings of the Visual Studio Code

## Compatibility

- Visual Studio Code 1.97+
- All languages supported by VS Code debugger
- Works with built-in and extension debuggers

## Known Issues

The background highlight color not showing behind the line number. Will be fixed in the future release.

## Contributing

Found an issue? Want to request a feature?
Please [open an issue](https://github.com/prasadgk/breakpoint-enhancer/issues) on GitHub.

## Release Notes

Please find the release history of Breakpoint Enhancer:

### 1.0.0

Initial release of Breakpoint Enhancer