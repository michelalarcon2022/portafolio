particlesJS('particles-js', {

    "particles": {

        "number": {
            "value": 25,
            "density": {
                "enable": true,
                "value_area": 900
            }
        },

        "color": {
            "value": "#960000"
        },

        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#960000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },

        "opacity": {
            "value": 0.25,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.05,
                "sync": false
            }
        },

        "size": {
            "value": 2,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },

        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#960000",
            "opacity": 0.15,
            "width": 1
        },

        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "bounce",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }

    },

    "interactivity": {

        "detect_on": "canvas",

        "events": {

            "onhover": {
                "enable": true,
                "mode": "repulse"
            },

            "onclick": {
                "enable": false
            },

            "resize": true

        },

        "modes": {

            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0.3
                }
            },

            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 0.4,
                "speed": 3
            },

            "repulse": {
                "distance": 100,
                "duration": 0.4
            },

            "push": {
                "particles_nb": 2
            }

        }

    },

    "retina_detect": true

});