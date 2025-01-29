import './css/AppLayout.css';

export default function AppLayout({logo, navbar, sidebar, main, ...props}) {
    return (
        <div class="app-layout">
            {logo}{navbar}{sidebar}{main}
        </div>
    )
}