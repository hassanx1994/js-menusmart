
//<![CDATA[
(function(e){var t=function(e,t){this.elem=e;this.settings=t;this.megaMenuHtml();this.ajaxcall=null;this.menulist=this.elem.find(".leftmenulist li a");this.menuHelper(this.elem);this.addEvents()};t.prototype={regex:{islabel:new RegExp("/search/label/","g"),issearch:new RegExp("[?&]q=","g"),labelsearch:new RegExp("(http://[^/]+)/search/label/([^/?&]+).*[?&]q=([^$&]+)(?:[^$]+)?","g"),label:new RegExp("(http://[^/]+)/search/label/([^/?&$]+)","g"),search:new RegExp("(http://[^/]+)/search/?[?&]q=(.*)","g")},addEvents:function(){var t=this;this.menulist.hover(function(){if(e(this).data("menuloaded")!=="true"){t.li=e(this);t.url=t.li.attr("href");t.container=t.li.closest("ul").siblings("ul");t.hoverOver()}},function(){t.hoverOut()})},hoverOver:function(){var t=this;this.getAJAXUrl();if(!this.ajaxUrl)return;this.ajaxcall=e.ajax({type:"GET",url:t.ajaxUrl,dataType:"jsonp",data:t.ajaxData,beforeSend:function(){t.showLoader()},success:function(e){t.hideLoader();t.addArrow();t.showPosts(e)},error:function(e){t.showError(e)}})},hoverOut:function(){this.ajaxcall.abort();this.hideLoader()},getAJAXUrl:function(){if(this.url){var e=this;this.ajaxData={alt:"json","max-results":this.settings.postsNumber};this.url.search(this.regex.islabel)!==-1&&this.url.search(this.regex.issearch)!==-1?this.ajaxUrl=this.url.replace(this.regex.labelsearch,function(t,n,r,i){e.ajaxData.q=i;return[n,"/feeds/posts/default/-/",r,"/"].join("")}):this.url.search(this.regex.islabel)!==-1&&this.url.search(this.regex.issearch)===-1?this.ajaxUrl=this.url.replace(this.regex.label,function(t,n,r){delete e.ajaxData.q;return[n,"/feeds/posts/default/-/",r,"/"].join("")}):this.url.search(this.regex.islabel)===-1&&this.url.search(this.regex.issearch)!==-1?this.ajaxUrl=this.url.replace(this.regex.search,function(t,n,r){e.ajaxData.q=r;return[n,"/feeds/posts/default"].join("")}):this.ajaxUrl=!1}else this.ajaxUrl=!1},showLoader:function(){e("<span></span>",{"class":"loading-icon"}).appendTo(this.li.closest("li"))},hideLoader:function(){this.li.closest("li").find("span.loading-icon").remove()},showPosts:function(t){var n=this,r=[],i,s,o;t.feed.openSearch$totalResults.$t>0?e.each(t.feed.entry,function(t,u){i=u.title.$t;e.each(u.link,function(e,t){t.rel==="alternate"?s=t.href:s="#"});o=u.media$thumbnail?u.media$thumbnail.url.replace(/\/s72\-c\//,"/s200-c/"):n.settings.noThumbnail;r.push('<li><span class="thumb-container"><a title="',i,'" href="',s,'"><img alt="',i,'" src="',o,'"/><br />',i,"</a></span></li>")}):r.push("<h5>","No posts available.","</h5>");this.container.html(r.join(""));this.menulist.removeData("menuloaded");this.li.data("menuloaded","true")},showError:function(e){if(e.statusText==="error"){this.hideLoader();this.addArrow();this.container.html("<h5>Oops... Could not fetch the blog posts.</h5>")}},addArrow:function(){this.menulist.closest("li").find("span").remove();this.menulist.removeClass("hover-menu");this.li.addClass("hover-menu");e("<span></span>",{"class":"menu-icon"}).appendTo(this.li.closest("li"))},menuHelper:function(t){var n=this;t.find(">li").hover(function(){var t=e(this);t.find("a:first").addClass("hover-menu");var r=e(this).find("ul.leftmenulist li").height()*e(this).find("ul.leftmenulist li").length;t.find("ul.rightmenulist").css({"min-height":r+"px"});n.requestFirstAjax(t)},function(){e(this).find("a:first").removeClass("hover-menu")})},megaMenuHtml:function(){this.elem.find("ul ul").remove();this.elem.addClass("megamenuid").find(">li").find("ul:first").addClass("leftmenulist").wrap(e("<div></div>",{"class":this.settings.divClass}));e("ul.leftmenulist").after(e("<ul></ul>",{"class":"rightmenulist"}))},requestFirstAjax:function(e){e=e.find(".leftmenulist li:first-child a");this.url=e.attr("href");this.container=e.closest("ul").siblings("ul");this.li=e;this.hoverOver()}};e.fn.megaBloggerMenu=function(n){var r={postsNumber:4,divClass:"megasubmenu",postsClass:"rightmenulist",noThumbnail:"/default.png"},i=e.extend({},r,n);return this.each(function(){var n=new t(e(this),i)})}})(jQuery);
//]]>


//<![CDATA[
jQuery(document).ready(function($) {
 $('#megamenuid').megaBloggerMenu({
  postsNumber : 4, // Number of Posts to show
  noThumbnail : 'http://2.bp.blogspot.com/-Z7jG9iO9OTg/Vazz6YJnFQI/AAAAAAAALVs/wlSvXPgdDAo/s1600/no_image_available.png' // Default thumbnail Image
 });
});


$(function() {
	var pull = $('#pull');
	menu = $('.mega-menu-wrap ul');
	menuHeight = menu.height();
	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle()
	});
	$(window).resize(function() {
		var w = $(window).width();
		if (w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style')
		}
	})
});

$(function(){
  $('.search-here').submit(function(e){
    if($('.search-box .search-field').val().length==0){
       $('.search-box .search-alert').fadeIn().css('display','inline-block');
      e.preventDefault();
    }
  });
});
//]]>

