/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

(function() {
	var asciiContainer = document.getElementById("ascii");
	var dataRate = document.getElementById("dataRate");
	var widthInput = document.getElementById("captureWidth");
	var heightInput = document.getElementById("captureHeight");
	var contrastInput = document.getElementById("contrast");
	var charactersInput = document.getElementById("characters");
	var fps = 30;
	var capturing = false;
	document.getElementById("pause").onclick = function() {
		document.getElementById("pause").innerText = "Pause";
		camera.init({
			width: parseInt(widthInput.value) || 160,
			height: parseInt(heightInput.value) || 120,
			fps: fps,
			mirror: true,

			onFrame: function(canvas) {
				ascii.fromCanvas(canvas, {
					contrast: parseInt(contrastInput.value) || 128,
					characters: charactersInput.value,
					callback: function(asciiString) {
						dataRate.value = Math.round(((asciiString.length * fps) / 1024), 1) + ' kb/s';
						asciiContainer.innerHTML = asciiString;
					}
				});
			},

			onSuccess: function() {
				document.getElementById("info").style.display = "none";

				capturing = true;
				document.getElementById("pause").style.display = "block";
				document.getElementById("pause").onclick = function() {
					if (capturing) {
						camera.pause();
						document.getElementById("pause").innerText = "Resume";

					} else {
						camera.start();
						document.getElementById("pause").innerText = "Pause";
					}
					capturing = !capturing;
				};
			},

			onError: function(error) {
				// TODO: log error
			},

			onNotSupported: function() {
				document.getElementById("info").style.display = "none";
				asciiContainer.style.display = "none";
				document.getElementById("notSupported").style.display = "block";
			}
		});
	};
})();
