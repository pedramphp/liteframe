 // JavaScript Document
/*
    :: http://inventory.vortalgroup.com 
    :: core.js - javascrip singleton OOP( jQuery Library 1.3.1 )
    :: All Code and design by Scott Haselton and Seyed-Mahdi PedramRazi
    :: Version 1.0 - Oct 2009
    :: Email : pedramphp@gmail.com
	:: Email : shaselton@gmail.com

*/


if (!this.console) { var console = {log:function(){}}; }

if (!window.$_LITE_) {
    window.$_LITE_ = window.$_LITE_ || {};
}

(function($L){
	
		
	$L.initialize = function(){
		
		$L.SetVariables();
		$L.Application.init(); 
	};
	
	/*---------------------------*
	 * ***************************
	 *   < VARIABLE PROCESSING  >
	 * ***************************
	 *---------------------------*/
	
			 /**********************
			 *  SET LITE VARIABLES *
			 ************************/   	
			$L.SetVariables = function(){
				  $L.vars = {};
				  $L.vars.applicationPath  = $L.applicationPath;			  
				  $L.vars.javascriptPath 		= $L.javascriptPath;
				  $L.vars.javascriptLibraryPath = $L.javascriptLibraryPath;
				  $L.vars.javascriptModulePath 		= $L.javascriptModulePath;			  
				  $L.vars.stylePath 		= $L.stylePath;
				  $L.vars.styleLibraryPath  = $L.styleLibraryPath; 	  
				  $L.vars.imagePath = $L.imagePath;		
				  $L.vars.action = $L.action;
			};
			
			/**********************
			 *  GET LITE VARIABLES *
			 ************************/     	
			 $L.GetVariables = function(){ return $L.vars; 	 }	
			 
			/************************
			 *  GET LITE VARIABLE  *
			 ************************/     	
			 $L.GetVariable = function($var){ return $L.vars[$var]; 	 }				 

			 
			/**********************
			 *  GET LITE Action Variable *
			 ************************/     	
			 $L.GetActionVariables = function(){ return $L.yActionJson; 	 }

			/**********************
			 *  GET LITE REQUEST VARIABLE *
			 ************************/
			 $L.GetRequestVariable = function($var){ return $L.Request[$var]; 	 }
			 
	/*---------------------------*
	 * ***************************
	 *   </ VARIABLE PROCESSING  >
	 * ***************************
	 *---------------------------*/

	
	/*****************************************************************************
	*                        Application Object                                  *
	*****************************************************************************/
	  //$L.Application.GetApplicationURL('',{ action :"loadCharacterDropdown" })
	    $L.Application = {};
	    $L.Application.Path  =  '';
	    $L.Application.File  =  'index.php';
	    $L.Application.init  =  function(){ this.Path = $L.applicationPath;  };
	    $L.Application.GetApplicationURL = function(action, parameters){
	                
            var valuePairs = [];
            if (action) { valuePairs.push('action='+action); }
            for (var property in parameters) { valuePairs.push(property + '=' + parameters[property]);  }
            var getString = '';
            if (valuePairs.length) { getString = '?' + valuePairs.join('&'); }
            return this.Path  + this.File + getString;
	                
	    };    
	
	/*****************************************************************************
	*                        Application Object Ends                             *
	*****************************************************************************/    
	
	$L.Application.QueryStringObject = function(){    
	         
	    var params = window.location.search.split("?"); 
	    if (params.length <= 1){return false;}
	    params = params[1].split("&");  
	    if (params.length == 0){return false;}   
	    var newParam = new Object();  
	    for ( var i = 0 ; i < params.length ; i++){
	        data  = params[i].split("=");
	        newParam[data[0]] = data[1]  ;
	    }        
	    return  newParam;
	    
	}    
	
	
	/*****************************************************************************
	*                        Ajax Object                                        *
	*****************************************************************************/
	    
	    $L.ajax = {};
	    $L.ajax.init    = function(){ $L.initializeAjax();   };
	    $L.ajax.run     = function(ajaxVars){ $.ajax( ajaxVars ); }
	    $L.ajax.loading = function(){  }              
	    
	/*****************************************************************************/
	
	    
	/************************************************************************************
	*                              AJAX DEFAULTS                                        *
	************************************************************************************/
	  $L.initializeAjax = function(){   
	        
	        var ajax = {
	            init : function(){
	                $.ajaxSetup(ajax.IntializeVars());
	            }, 
	            intializeVars : function(){
	
	                return ({
	                      type       : 'POST'     ,
	                      dataType   : 'html'     ,
	                      beforeSend : ajax.beforeSend ,
	                      error      : ajax.error
	                });
	                            
	            },   
	            beforeSend : function(){ },  
	            error : function(){  }
	                
	        }; // Ajax Object Ends     
	        return ajax.init();
	  };
	  
	  $L.jsonRPC =  function( config ){

		  	var base = {
		  		context: config.scope || document.body,
			  	data:{
					api: config.api,
					method: config.method,
					config: config.data
				},
				dataType: 'json',
				type: 'POST',
				context: config.scope || document.body,
				url: $_LITE_.Application.GetApplicationURL('jsonrpc')
		  	};
		  	delete config.context;
		  	delete config.api;
		  	delete config.method;
		  	delete config.data;
		  	$.ajax($.extend({},base, config));
		};
	
	  return ( $L.initialize() );

})($_LITE_);


