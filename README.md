### Overview of frontend in Cellulo

## Getting Started 

	# For styling only tailwind css and some normal inline css is used.
	# Tailwind is used here to reduce writing and handling of css files and for further ease in customisation.
	# Some Tailwind components are used from flowbite.
	# Although most of the tailwind classes are self explanatory, but docs can always be referred (very easy to learn)

	# Jinja2 library is used for integrating with python django backend
	# pdf.js is used for rendering pdf and extracting pages from the pdf
	# fabric.js is a canvas library used for selecting and highlighting pdf area
	# Iconify is used for all the icons and svg files
		refer: [1] https://tailwindcss.com/docs/installation
		  	   [2] https://flowbite.com/docs/getting-started/introduction/
		  	   [3] https://jinja.palletsprojects.com/en/2.11.x/templates/
		  	   [4] https://mozilla.github.io/pdf.js/
		  	   [5] http://fabricjs.com/docs/
		  	   [6] https://icon-sets.iconify.design/

## Future Improvements

	# At this point the cdn link is being used for tailwind, but for deployment it should be added as a package in the project for further customisations.

	# The website is using single font size/family, colur scheme, light/dark mode, but in the future when the website is to be made more
	customisable for the user, it can be made custtomizable by adding your custom classes in your "tailwind.config.js file"
		refer: [1] https://tailwindcss.com/docs/adding-custom-styles
			   [2] https://tailwindcss.com/docs/dark-mode

	# If the website is to be made more responsive for all types of devices then the responsive classes can be added as required
		refer: [1] https://tailwindcss.com/docs/responsive-design

	# There is always a scope for more better code readability and code refactoring.

	# In the future if possible then the frontend can be written in react, redux, next.js for a more modular code structure, adding more complex frontend features and better handling of objects and variables.




