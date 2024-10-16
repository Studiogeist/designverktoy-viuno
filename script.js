
        // Add an event listener for swatch selection
        document.querySelectorAll('input[name="swatch"]').forEach(input => {
            input.addEventListener('change', () => {
                const selectedSwatch = document.querySelector('input[name="swatch"]:checked').value;
                viunoContainer.className = `viuno-container ${selectedSwatch}`;
            });
        });

        const textInput = document.getElementById('text-input');
        const iconInput = document.getElementById('icon-input');
        const viunoContainer = document.querySelector('.viuno-container');
        const viunoHeading = document.getElementById('viuno-heading');
        const viunoIcon = document.getElementById('viuno-icon');
        const exportButton = document.getElementById('export-button');
        const exportSizeInput = document.getElementById('export-size');
        

exportSizeInput.addEventListener('change', () => {
    const selectedSize = exportSizeInput.value;

    // Reset font size and icon size to their original values
    viunoHeading.style.fontSize = '60px';
    viunoHeading.style.lineHeight = '75px'; // Reset to the original line height
    viunoIcon.style.height = '160px'; // Reset icon size

    // Update the viuno-container size based on the selected option
    if (selectedSize === '1x1') {
        viunoContainer.style.width = '540px';
        viunoContainer.style.height = '540px';

        // Reset other elements that might have been modified for 9x16
        viunoContainer.style.alignItems = 'flex-start'; // Reset alignment
        viunoContainer.style.justifyContent = 'space-between'; // Reset container behavior
        viunoHeading.style.fontSize = '60px'; // Reset font size for heading
        viunoHeading.style.lineHeight = '75px'; // Reset line height
        viunoIcon.style.height = '160px'; // Reset icon size
    } else if (selectedSize === '9x16') {
        viunoContainer.style.width = '540px';
        viunoContainer.style.height = '960px';

        // Adjust font size and icon size for 9x16 size
        viunoHeading.style.fontSize = '78px';
        viunoHeading.style.lineHeight = '84px';
        viunoIcon.style.height = '225px';
    }
});


        textInput.addEventListener('input', () => {
            viunoHeading.textContent = textInput.value;
        });

        iconInput.addEventListener('change', () => {
            viunoIcon.src = iconInput.value;
        });

exportButton.addEventListener('click', () => {
    let exportWidth, exportHeight;

    if (exportSizeInput.value === '1x1') {
        exportWidth = 540;
        exportHeight = 540;
    } else if (exportSizeInput.value === '9x16') {
        exportWidth = 540;
        exportHeight = 960;
    }

    // Adjust the container's size based on the selected export size
    viunoContainer.style.width = exportWidth + 'px';
    viunoContainer.style.height = exportHeight + 'px';

    // Wait for the layout to update before capturing the container
    setTimeout(() => {
        html2canvas(viunoContainer, { useCORS: true }).then(canvas => {
            const dataURL = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'viuno.png';
            a.click();
        }).catch(error => {
            console.error("Error capturing the canvas: ", error);
        });

    }, 300);
});

// Make sure background images are loaded
const backgroundUploadInput = document.getElementById('background-upload');

backgroundUploadInput.addEventListener('change', function() {
    const file = this.files[0];

    if (!file) {
        console.error("No file selected.");
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        const imageUrl = e.target.result;
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                viunoContainer.style.backgroundImage = `url(${imageUrl})`;
                viunoContainer.style.backgroundSize = 'cover';
                viunoContainer.style.backgroundPosition = 'center';
            };
        } else {
            console.error("FileReader did not return a valid image URL.");
        }
    };

    reader.onerror = (e) => {
        console.error("Error reading file: ", e);
    };

    reader.readAsDataURL(file);
});

backgroundUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) {
        console.error("No file selected.");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const imageUrl = e.target.result;
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                viunoContainer.style.backgroundImage = `url(${imageUrl})`;
                viunoContainer.style.backgroundSize = 'cover';
                viunoContainer.style.backgroundPosition = 'center';
            };
        } else {
            console.error("FileReader did not return a valid image URL.");
        }
    };

    reader.onerror = (e) => {
        console.error("Error reading file: ", e);
    };

    reader.readAsDataURL(file);
});


const toggleTextCheckbox = document.getElementById('toggle-text');
const toggleIconCheckbox = document.getElementById('toggle-icon');

toggleTextCheckbox.addEventListener('change', () => {
    if (toggleTextCheckbox.checked) {
        viunoHeading.style.opacity = '1';  // Set opacity to 1 to show
    } else {
        viunoHeading.style.opacity = '0';  // Set opacity to 0 to hide
    }
});

toggleIconCheckbox.addEventListener('change', () => {
    if (toggleIconCheckbox.checked) {
        viunoIcon.style.opacity = '1';  // Set opacity to 1 to show
    } else {
        viunoIcon.style.opacity = '0';  // Set opacity to 0 to hide
    }
});


