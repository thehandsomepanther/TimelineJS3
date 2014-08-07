/*	TimelineJS
	Designed and built by Zach Wise at KnightLab

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
	
================================================== */
/* 
	TODO
	
*/ 

/*	Required Files
	CodeKit Import
	http://incident57.com/codekit/
================================================== */

// CORE
	// @codekit-prepend "core/VCO.js";
	// @codekit-prepend "core/VCO.Util.js";
	// @codekit-prepend "data/VCO.Data.js";
	// @codekit-prepend "core/VCO.Class.js";
	// @codekit-prepend "core/VCO.Events.js";
	// @codekit-prepend "core/VCO.Browser.js";
	// @codekit-prepend "core/VCO.Load.js";

// LANGUAGE
	// @codekit-prepend "language/VCO.Language.js";

// ANIMATION
	// @codekit-prepend "animation/VCO.Ease.js";
	// @codekit-prepend "animation/VCO.Animate.js";

// DOM
	// @codekit-prepend "dom/VCO.Point.js";
	// @codekit-prepend "dom/VCO.DomMixins.js";
	// @codekit-prepend "dom/VCO.Dom.js";
	// @codekit-prepend "dom/VCO.DomUtil.js";
	// @codekit-prepend "dom/VCO.DomEvent.js";
	
// Date
	// @codekit-prepend "date/VCO.DateFormat.js";
	// @codekit-prepend "date/VCO.Date.js";
	// @codekit-prepend "date/VCO.DateUtil.js";

// UI
	// @codekit-prepend "ui/VCO.Draggable.js";
	// @codekit-prepend "ui/VCO.Swipable.js";
	// @codekit-prepend "ui/VCO.MenuBar.js";
	// @codekit-prepend "ui/VCO.Message.js";

// MEDIA
	// @codekit-prepend "media/VCO.MediaType.js";
	// @codekit-prepend "media/VCO.Media.js";

// MEDIA TYPES
	// @codekit-prepend "media/types/VCO.Media.Blockquote.js";
	// @codekit-prepend "media/types/VCO.Media.Flickr.js";
	// @codekit-prepend "media/types/VCO.Media.Instagram.js";
	// @codekit-prepend "media/types/VCO.Media.Profile.js";
	// @codekit-prepend "media/types/VCO.Media.GoogleDoc.js";
	// @codekit-prepend "media/types/VCO.Media.GooglePlus.js";
	// @codekit-prepend "media/types/VCO.Media.IFrame.js";
	// @codekit-prepend "media/types/VCO.Media.Image.js";
	// @codekit-prepend "media/types/VCO.Media.SoundCloud.js";
	// @codekit-prepend "media/types/VCO.Media.Storify.js";
	// @codekit-prepend "media/types/VCO.Media.Text.js";
	// @codekit-prepend "media/types/VCO.Media.Twitter.js";
	// @codekit-prepend "media/types/VCO.Media.Vimeo.js";
	// @codekit-prepend "media/types/VCO.Media.DailyMotion.js";
	// @codekit-prepend "media/types/VCO.Media.Vine.js";
	// @codekit-prepend "media/types/VCO.Media.Website.js";
	// @codekit-prepend "media/types/VCO.Media.Wikipedia.js";
	// @codekit-prepend "media/types/VCO.Media.YouTube.js";
	// @codekit-prepend "media/types/VCO.Media.Slider.js";

// STORYSLIDER
	// @codekit-prepend "slider/VCO.Slide.js";
	// @codekit-prepend "slider/VCO.SlideNav.js";
	// @codekit-prepend "slider/VCO.StorySlider.js";

// TIMENAV
	// @codekit-prepend "timenav/VCO.TimeNav.js";
	// @codekit-prepend "timenav/VCO.TimeMarker.js";
	// @codekit-prepend "timenav/VCO.TimeScale.js";
	// @codekit-prepend "timenav/VCO.TimeAxis.js";
	// @codekit-prepend "timenav/VCO.AxisHelper.js";


VCO.Timeline = VCO.Class.extend({
	
	includes: VCO.Events,
	
	/*	Private Methods
	================================================== */
	initialize: function (elem, data, options) {
		var self = this;
		
		// Version
		this.version = "0.0.16";
		
		// Ready
		this.ready = false;
		
		// DOM ELEMENTS
		this._el = {
			container: {},
			storyslider: {},
			timenav: {},
			menubar: {}
		};
		
		// Determine Container Element
		if (typeof elem === 'object') {
			this._el.container = elem;
		} else {
			this._el.container = VCO.Dom.get(elem);
		}
		
		// Slider
		this._storyslider = {};
		
		
		// TimeNav
		this._timenav = {};
		
		// Menu Bar
		this._menubar = {};
		
		// Loaded State
		this._loaded = {storyslider:false, timenav:false};
		
		// Data Object
		// Test Data compiled from http://www.pbs.org/marktwain/learnmore/chronology.html
		this.data = {};
	
		this.options = {
			script_path:            "",
			height: 				this._el.container.offsetHeight,
			width: 					this._el.container.offsetWidth,
			scale_factor: 			1.5, 				// How many screen widths wide should the timeline be
			layout: 				"landscape", 	// portrait or landscape
			timenav_position: 		"bottom", 		// timeline on top or bottom
			optimal_tick_width: 	100,			// optimal distance (in pixels) between ticks on axis
			base_class: 			"",
			timenav_height: 		200,
			start_at_slide: 		0,
			menubar_height: 		0,
			skinny_size: 			650,
			relative_date: 			false, 			// Use momentjs to show a relative date from the slide.text.date.created_time field
			// animation
			duration: 				1000,
			ease: 					VCO.Ease.easeInOutQuint,
			// interaction
			dragging: 				true,
			trackResize: 			true,
			map_type: 				"stamen:toner-lite",
			slide_padding_lr: 		100, 			// padding on slide of slide
			slide_default_fade: 	"0%", 			// landscape fade

			api_key_flickr: 		"f2cc870b4d233dd0a5bfe73fd0d64ef0",
			language:               "en"		
		};
		
		// Current Slide
		this.current_slide = this.options.start_at_slide;
		
		// Animation Objects
		this.animator_timenav = null;
		this.animator_storyslider = null;
		
		// Merge Options
		VCO.Util.mergeData(this.options, options);
		
		if (this.options.layout == "landscape") {
			this.options.map_center_offset = {left: -200, top: 0};
		}
		
		// Zoomify Layout
		if (this.options.map_type == "zoomify" && this.options.map_as_image) {
			this.options.map_size_sticky = 2;
			
		}
		
		// Map as Image 
		if (this.options.map_as_image) {
			this.options.calculate_zoom = false;
		}
		
		// Use Relative Date Calculations
		if(this.options.relative_date) {
			if (typeof(moment) !== 'undefined') {
				self._loadLanguage(data);
			} else {
				VCO.Load.js(this.options.script_path + "/library/moment.js", function() {
					self._loadLanguage(data);
					trace("LOAD MOMENTJS")
				});
			}
			
		} else {
			self._loadLanguage(data);
		}
		
		

	},
	
	/*	Load Language
	================================================== */
	_loadLanguage: function(data) {
		var self = this;
		if(this.options.language == 'en') {
		    this.options.language = VCO.Language;
		    this._initData(data);
		} else {
			VCO.Load.js(this.options.script_path + "/locale/" + this.options.language + ".js", function() {
				self._initData(data);
			});
		}
	},
	
	/*	Navigation
	================================================== */
	goToId: function(n) {
		if (this.current_id != n) {
			this.current_id = e.uniqueid;
			this._timenav.goToId(this.current_id);
			this._storyslider.goToId(this.current_id);
			this.fire("change", {uniqueid:this.current_id}, this);
		}
	},
	
	goTo: function(n) {
		if (n != this.current_slide) {
			this.current_slide = n;
			this._storyslider.goTo(this.current_slide);
			this._map.goTo(this.current_slide);
		}
	},

	updateDisplay: function() {
		if (this.ready) {
			this._updateDisplay();
		}
	},
	
	/*	Private Methods
	================================================== */
	
	// Update View
	_updateDisplay: function(timenav_height, animate, d) {
		var duration 		= this.options.duration,
			display_class 	= this.options.base_class,
			self			= this;
		
		if (d) {
			duration = d;
		}
		
		// Update width and height
		this.options.width = this._el.container.offsetWidth;
		this.options.height = this._el.container.offsetHeight;
		
		// Check if skinny
		if (this.options.width <= this.options.skinny_size) {
			this.options.layout = "portrait";
		} else {
			this.options.layout = "landscape";
		}
		
		
		// Map Height
		if (timenav_height) {
			this.options.timenav_height = timenav_height;
		}
		
		
		// Detect Mobile and Update Orientation on Touch devices
		if (VCO.Browser.touch) {
			this.options.layout = VCO.Browser.orientation();
			display_class += " vco-mobile";
		}
		
		// LAYOUT
		if (this.options.layout == "portrait") {
			
			display_class += " vco-skinny";
			// Portrait
			display_class += " vco-layout-portrait";

		} else {
			// Landscape
			display_class += " vco-layout-landscape";
			
		}
		
		this.options.storyslider_height = (this.options.height - this.options.timenav_height);
		
		if (animate) {
		
			// Animate Map
			if (this.animator_timenav) {
				this.animator_timenav.stop();
			}
		
			this.animator_timenav = VCO.Animate(this._el.timenav, {
				height: 	(this.options.timenav_height) + "px",
				duration: 	duration,
				easing: 	VCO.Ease.easeOutStrong,
				complete: function () {
					//self._map.updateDisplay(self.options.width, self.options.timenav_height, animate, d, self.options.menubar_height);
				}
			});
		
			// Animate StorySlider
			if (this.animator_storyslider) {
				this.animator_storyslider.stop();
			}
			this.animator_storyslider = VCO.Animate(this._el.storyslider, {
				height: 	this.options.storyslider_height + "px",
				duration: 	duration,
				easing: 	VCO.Ease.easeOutStrong
			});
		
		} else {
			// TimeNav
			this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px";
		
			// StorySlider
			this._el.storyslider.style.height = this.options.storyslider_height + "px";
		}
		
		// Update Component Displays
		this._timenav.updateDisplay(this.options.width, this.options.height, animate);
		this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, animate, this.options.layout);
		
		// Apply class
		this._el.container.className = display_class;
	},
	
	/*	Data Prep
	================================================== */
	_makeUniqueIdentifiers: function(array) {
		var used = []
		for (var i = 0; i < array.length; i++) {
			if (array[i].uniqueid && array[i].uniqueid.replace(/\s+/,'').length > 0) {
				array[i].uniqueid = VCO.Util.slugify(array[i].uniqueid); // enforce valid
				if (used.indexOf(array[i].uniqueid) != -1) {
					array[i].uniqueid = '';
				} else {
					used.push(array[i].uniqueid);
				}
			}
		};
		if (used.length != array.length) {
			for (var i = 0; i < array.length; i++) {
				if (!array[i].uniqueid) {
					var slug = VCO.Util.slugify(array[i].text.headline);
					if (!slug) {
						slug = VCO.Util.unique_ID(6);
					}
					if (used.indexOf(slug) != -1) {
						slug = slug + '-' + i;
					}
					used.push(slug);
					array[i].uniqueid = slug;
				}
			}
		}
	},
	_processDates: function(array) {
		for (var i = 0; i < array.length; i++) {
			array[i].date = new VCO.Date(array[i].date);
		}
	},
	/*	Init
	================================================== */
	// Initialize the data
	_initData: function(data) {
		trace("_initData")
		var self = this;
		
		if (typeof data === 'string') {
			trace("string");
			
			VCO.ajax({
				type: 'GET',
				url: data,
				dataType: 'json', //json data type
				success: function(d){
					if (d && d.timeline) {
						VCO.Util.mergeData(self.data, d.timeline);
					}
					self._makeUniqueIdentifiers(self.data.slides); // TODO integrate these 
					self._processDates(self.data.slides);          // into '_cleanData'
					VCO.DateUtil.sortByDate(self.data.slides);
					self._onDataLoaded();
				},
				error:function(xhr, type){
					trace("ERROR LOADING");
					trace(xhr);
					trace(type);
				}
			});
		} else if (typeof data === 'object') {
			if (data.timeline) {
				self.data = data.timeline;
			} else {
				trace("data must have a timeline property")
			}
			self._onDataLoaded();
		} else {
			self._onDataLoaded();
		}
	},
	
	// Initialize the layout
	_initLayout: function () {
		var self = this;
		
		this._el.container.className += ' vco-timeline';
		this.options.base_class = this._el.container.className;
		
		// Create Layout
		if (this.options.timenav_position == "top") {
			this._el.timenav 		= VCO.Dom.create('div', 'vco-timenav', this._el.container);
			this._el.storyslider 	= VCO.Dom.create('div', 'vco-storyslider', this._el.container);
		} else {
			this._el.storyslider 	= VCO.Dom.create('div', 'vco-storyslider', this._el.container);
			this._el.timenav 		= VCO.Dom.create('div', 'vco-timenav', this._el.container);
		}
		

		
		// Initial Default Layout
		this.options.width 				= this._el.container.offsetWidth;
		this.options.height 			= this._el.container.offsetHeight;
		this._el.storyslider.style.top 	= "1px";
		
		// Create Map using preferred Map API
		//this._map = new VCO.Map.Leaflet(this._el.map, this.data, this.options);
		//this.map = this._map._map; // For access to Leaflet Map.
		//this._map.on('loaded', this._onMapLoaded, this);
		
		// Map Background Color
		//this._el.map.style.backgroundColor = this.options.map_background_color;
		
		// Create TimeNav
		this._timenav = new VCO.TimeNav(this._el.timenav, this.data, this.options);
		this._timenav.on('loaded', this._onTimeNavLoaded, this);
		this._timenav.init();
		
		// Create StorySlider
		this._storyslider = new VCO.StorySlider(this._el.storyslider, this.data, this.options);
		this._storyslider.on('loaded', this._onStorySliderLoaded, this);
		this._storyslider.init();
		
		// LAYOUT
		if (this.options.layout == "portrait") {
			this.options.storyslider_height = (this.options.height - this._el.menubar.offsetHeight - this.options.timenav_height - 1);
		} else {
			this.options.menubar_height = this._el.menubar.offsetHeight;
			this.options.storyslider_height = (this.options.height - this._el.menubar.offsetHeight - 1);
		}
		
		
		// Update Display
		this._updateDisplay(this.options.timenav_height, true, 2000);
		
	},
	
	_initEvents: function () {
		
		// TimeNav Events
		this._timenav.on('collapse', this._onMenuBarCollapse, this);
		this._timenav.on('change', this._onTimeNavChange, this);
		
		// StorySlider Events
		this._storyslider.on('change', this._onSlideChange, this);
		this._storyslider.on('colorchange', this._onColorChange, this);
	},
	
	/*	Set Current Slide
	================================================== */
	_getCurrentSlide: function(n, array) {
		// Find Array Number
		if (typeof n == 'string' || n instanceof String) {
			_n = VCO.Util.findArrayNumberByUniqueID(n, array, "uniqueid");
		} else {
			_n = n;
		}
		return _n;
	},
	
	/*	Events
	================================================== */
	
	_onDataLoaded: function(e) {
		trace("dataloaded");
		this.fire("dataloaded");
		this._initLayout();
		this._initEvents();
		this.ready = true;
		
	},
	
	_onColorChange: function(e) {
		if (e.color || e.image) {
			
		} else {
			
		}
	},
	
	_onSlideChange: function(e) {
		if (this.current_id != e.uniqueid) {
			this.current_id = e.uniqueid;
			this._timenav.goToId(this.current_id);
			this.fire("change", {uniqueid:this.current_id}, this);
		}
	},
	
	_onTimeNavChange: function(e) {
		if (this.current_id != e.uniqueid) {
			this.current_id = e.uniqueid;
			this._storyslider.goToId(this.current_id);
			this.fire("change", {uniqueid:this.current_id}, this);
		}
	},
	
	_onOverview: function(e) {
		this._timenav.goToOverview();
	},
	
	_onBackToStart: function(e) {
		this.current_slide = 0;
		this._timenav.goTo(this.current_slide);
		this._storyslider.goTo(this.current_slide);
		this.fire("change", {current_slide: this.current_slide}, this);
	},
	
	_onMenuBarCollapse: function(e) {
		this._updateDisplay(e.y, true);
	},
	
	_onMouseClick: function(e) {
		
	},
	
	_fireMouseEvent: function (e) {
		if (!this._loaded) {
			return;
		}

		var type = e.type;
		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) {
			return;
		}

		if (type === 'contextmenu') {
			VCO.DomEvent.preventDefault(e);
		}
		
		this.fire(type, {
			latlng: "something", //this.mouseEventToLatLng(e),
			layerPoint: "something else" //this.mouseEventToLayerPoint(e)
		});
	},
	
	_onTimeNavLoaded: function() {
		this._loaded.timenav = true;
		this._onLoaded();
	},
	
	_onStorySliderLoaded: function() {
		this._loaded.storyslider = true;
		this._onLoaded();
	},
		
	_onLoaded: function() {
		if (this._loaded.storyslider && this._loaded.timenav) {
			this.fire("loaded", this.data);
		}
	}
	
	
});


