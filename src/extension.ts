import * as vscode from 'vscode';

// Configuration interface
interface BreakpointEnhancerConfig {
	textHighlightColor: string;
	highlightColor: string;
	indicatorSize: number;
	activationDelay: number;
}
let updateTimeout: NodeJS.Timeout | undefined;
let decorationType: vscode.TextEditorDecorationType | undefined;
let activeEditor = vscode.window.activeTextEditor;

export function activate(context: vscode.ExtensionContext) {

	// Debounced decoration update
	const updateDecorations = debounce(() => {
		if (!activeEditor || !decorationType) {
			return;
		};
		const breakpoints = getBreakpointsForCurrentFile();
		activeEditor.setDecorations(decorationType, breakpoints);
	}, getConfig().activationDelay);

	// Initialize decoration type
	const initializeDecorationType = () => {
		decorationType?.dispose();
		const config = getConfig();
		decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: config.highlightColor,
			color: config.textHighlightColor,
			//gutterIconPath: createIndicatorSvg(config.indicatorSize),
			//gutterIconSize: "contain",
			isWholeLine: true,
		});
	};

	// Initial setup
	initializeDecorationType();
	updateDecorations();

	// Event subscriptions
	context.subscriptions.push(
		vscode.debug.onDidChangeBreakpoints(() => {
			updateDecorations();
		}),

		vscode.window.onDidChangeActiveTextEditor(editor => {
			activeEditor = editor;
			updateDecorations();
		}),

		vscode.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration('breakpointEnhancer')) {
				initializeDecorationType();
				updateDecorations();
			}
		})
	);
}

// Helper functions
function getConfig(): BreakpointEnhancerConfig {
	const config = vscode.workspace.getConfiguration('breakpointEnhancer');
	return {
		highlightColor: config.get('highlightColor') || '#FF000033',
		textHighlightColor: config.get('textHighlightColor') || '#FFFFFF',
		indicatorSize: config.get('indicatorSize') || 14,
		activationDelay: config.get('activationDelay') || 50
	};
}

function getBreakpointsForCurrentFile(): vscode.DecorationOptions[] {
	return vscode.debug.breakpoints
		.filter((bp): bp is vscode.SourceBreakpoint =>
			bp instanceof vscode.SourceBreakpoint &&
			bp.location.uri?.toString() === vscode.window.activeTextEditor?.document.uri.toString()
		)
		.map(bp => ({
			range: new vscode.Range(
				bp.location.range.start.line,
				0,
				bp.location.range.start.line,
				0
			),
			hoverMessage: 'Enhanced Breakpoint'
		}));
}

function createIndicatorSvg(size: number = 14): vscode.Uri {
	return vscode.Uri.parse(`data:image/svg+xml,${encodeURIComponent(`
		<svg xmlns="http://www.w3.org/2000/svg"
			 width="${size}" 
			 height="${size}"
			 viewBox="0 0 ${size} ${size}">
		  <circle cx="${size / 2}" 
				  cy="${size / 2}" 
				  r="5"
				  fill="#FF0000"
				  stroke-width="0"/>
		</svg>
	  `)}`);
}

function debounce(fn: Function, delay: number) {
	return (...args: any[]) => {
		clearTimeout(updateTimeout!);
		updateTimeout = setTimeout(() => fn(...args), delay);
	};
}

export function deactivate() {
	decorationType?.dispose();
}