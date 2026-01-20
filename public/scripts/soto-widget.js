(function () {
    const SCRIPT_ID = 'soto-widget-script';
    const CONTAINER_ID = 'soto-widget-container';
    // Updated to production URL
    const IFRAME_URL = 'https://reservas.sotodelprior.com/widget/restaurant';

    function init() {
        // Prevent multiple initializations
        if (document.getElementById(CONTAINER_ID)) return;

        // 1. Inject CSS
        const style = document.createElement('style');
        style.innerHTML = `
            #soto-widget-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999999;
                display: none; /* Hidden by default */
                justify-content: center;
                align-items: center;
                backdrop-filter: blur(4px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            #soto-widget-overlay.open {
                display: flex;
                opacity: 1;
            }
            #soto-widget-modal {
                background: white;
                width: 1000px;
                max-width: 95vw;
                height: auto;
                max-height: 90vh;
                border-radius: 8px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                position: relative;
                overflow: hidden;
                transform: scale(0.95);
                transition: transform 0.3s ease;
            }
            #soto-widget-overlay.open #soto-widget-modal {
                transform: scale(1);
            }
            #soto-widget-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: #f4f4f4;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #333;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                padding-bottom: 4px;
            }
            #soto-widget-close:hover {
                background: #e0e0e0;
            }
            #soto-widget-iframe {
                width: 100%;
                height: 80vh; /* Responsive height */
                min-height: 600px;
                border: none;
            }
        `;
        document.head.appendChild(style);

        // 2. Create Elements

        // Overlay & Modal
        const overlay = document.createElement('div');
        overlay.id = 'soto-widget-overlay';

        const modal = document.createElement('div');
        modal.id = 'soto-widget-modal';

        const closeBtn = document.createElement('button');
        closeBtn.id = 'soto-widget-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = closeModal;

        const iframe = document.createElement('iframe');
        iframe.id = 'soto-widget-iframe';
        iframe.src = IFRAME_URL;

        modal.appendChild(closeBtn);
        modal.appendChild(iframe);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 3. Logic
        function openModal(e) {
            if (e) e.preventDefault();
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            // Refresh iframe src to avoid stale state if needed
            // iframe.src = IFRAME_URL;
        }

        function closeModal() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Close on clicking outside
        overlay.onclick = function (e) {
            if (e.target === overlay) {
                closeModal();
            }
        };

        // 4. Expose API and Bind Triggers
        window.SotoWidget = {
            open: openModal,
            close: closeModal
        };

        // Bind to any element with class 'soto-widget-trigger'
        const bindTriggers = () => {
            document.querySelectorAll('.soto-widget-trigger').forEach(btn => {
                btn.removeEventListener('click', openModal);
                btn.addEventListener('click', openModal);
            });
        };

        bindTriggers();

        // Expose bind method for dynamic content
        window.SotoWidget.bind = bindTriggers;

        console.log('Soto Widget Initialized. Class .soto-widget-trigger available.');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
