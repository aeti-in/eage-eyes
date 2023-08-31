// Function to check if an element is visible
function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

// Function to start observing mutations
function startObserver() {
    // Initialize MutationObserver
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        // Temporarily disconnect observer to avoid loops
        observer.disconnect();

        mutations.forEach(function(mutation) {
            let element = mutation.target;  // The mutated element

            // Observe attribute changes
            if (mutation.type === 'attributes' && isVisible(element)) {
                let attributeName = mutation.attributeName;
                let attributeValue = element.getAttribute(attributeName);
                let oldValue = mutation.oldValue;

                // Revert the change
                element.setAttribute(attributeName, oldValue);

                // Alert the user
                //alert(`Attribute reverted. Name: ${attributeName}, New 	value: ${attributeValue}, Reverted to: ${oldValue}`);
            }

            // Observe changes to text content
			if (mutation.type === 'characterData') {
				console.log("Text change detected");  // Debug log
				console.log("Is parent element visible?", isVisible(mutation.target.parentElement));  // Debug log

				if (isVisible(mutation.target.parentElement)) {
					let newValue = mutation.target.nodeValue;
					let oldValue = mutation.oldValue;

					console.log(`Text content changed to ${newValue} (was ${oldValue})`);  // Debug log

					// Revert the change
					mutation.target.nodeValue = oldValue;

					// Alert the user
					alert(`Text content reverted. New value: ${newValue}, Reverted to: ${oldValue}`);
				}
			}

        });

        // Reconnect observer
        observer.observe(document, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });
    });

    // Start observing
    observer.observe(document, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });
}

// Start the observer after a 5-second delay
setTimeout(startObserver, 2000);
