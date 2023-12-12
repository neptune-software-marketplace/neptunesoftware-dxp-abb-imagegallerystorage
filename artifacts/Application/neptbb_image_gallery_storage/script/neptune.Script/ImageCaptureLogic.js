// Here is a breakdown of the code:

// The code starts by attaching an initialization function to the SAPUI5 core. This function is executed when the core is initialized.

// After a delay of 500 milliseconds, the code sets up an event listener for the change event on a file input element. 
// When a file is selected, the handleFileSelect function is called.

// The handleFileSelect function is responsible for processing the selected file.
// It creates a FileReader object to read the file data.
// When the file is loaded, the onload event is triggered, and the function converts the binary data to base64 format.
// It then creates an object containing the image ID (generated using Date.now()) and the base64 data.
// The image object is added to an array of images stored in the modeloModelArrayImageStorage model.
// The modeloCarousel model is also updated with the new images.
// Finally, the function checks the length of the currentImages array and shows or hides a delete button accordingly.

// The deleteCurrentPicture function is called when the delete button is clicked.
// It retrieves the active page of the carousel and extracts the last character of the page ID to determine the index of the image to be deleted.
// The image is removed from the currentImages array and the modeloModelArrayImageStorage and modeloCarousel models are updated accordingly.
// The delete button's visibility is also updated based on the length of the currentImages array.

sap.ui.getCore().attachInit(function (data) {
    oHTMLObjectCameraUpload.setContent(
        '<input type="file" accept="image/*" id="file-input"  style="display:none">'
    );
});

// Capturing a new image
setTimeout(function () {
    modeloModelArrayImageStorage.setData([]);

    const fileInput = oFlexBoxCameraUpload.getDomRef();
    fileInput.addEventListener("change", (e) => handleFileSelect(e.target.files[0]));
}, 500);

/**This function takes the current date.now() and
 *  stores that as the image ID alongside the base64data
 *
 * */
function handleFileSelect(f) {
    var reader = new FileReader();

    reader.onload = (function (theFile) {
        return function (e) {
            var binaryData = e.target.result;
            // Converting Binary Data to base 64
            var base64String = window.btoa(binaryData);

            var fullBase64picture = "data:image/png;base64," + base64String;

            var imageToStore = {
                imageID: Date.now(),
                base64data: fullBase64picture,
            };

            var currentImages = modeloModelArrayImageStorage.getData();
            currentImages.push(imageToStore);
            modeloModelArrayImageStorage.setData(currentImages);
            modeloCarousel.setData(currentImages);

            if (currentImages.length > 0) {
                oButtonDeletePicture.setVisible(true);
            } else {
                oButtonDeletePicture.setVisible(false);
            }

            //console.log(modeloModelArrayImageStorage.getData());
        };
    })(f);
    reader.readAsBinaryString(f);

    setTimeout(function () {
        oCarousel.next();
    }, 500);
}

function deleteCurrentPicture() {
    var currentPage = oCarousel.getActivePage();
    var currentPagelastChar = parseInt(currentPage.substr(currentPage.length - 1));

    var currentImages = modeloModelArrayImageStorage.getData();

    currentImages.splice(currentPagelastChar, 1);

    modeloModelArrayImageStorage.setData(currentImages);

    modeloCarousel.setData(currentImages);

    if (currentImages.length > 0) {
        oButtonDeletePicture.setVisible(true);
    } else {
        oButtonDeletePicture.setVisible(false);
    }
}
