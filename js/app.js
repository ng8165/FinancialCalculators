if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/tax-yield-calc/service-worker.js').then(function(registration) {
            console.log('[ServiceWorker] Registration Successful! Scope: ', registration.scope);
        }, function(err) {
            console.log('[ServiceWorker] Registration Failed... Error: ', err);
        });
    });
}