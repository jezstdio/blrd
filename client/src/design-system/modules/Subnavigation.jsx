<div id="subnavigation" class="subnavigation hidden <%= locals.cssClass ? cssClass : '' %> pl-56 left-0 left-a0--d zindex-1" <%= locals.dataColor ? `data-top-color=${dataColor}` : '' %>>
    <a class="block pt-16 mb-32 fontSize-32 no-decoration" href="#">
        <span class="<%= `${textColor2}-text` %>">ME</span><span class="<%= `${textColor1}-text` %>">NU</span>
    </a>
    <%- include("navigation_elements", { 
        isActive_home: locals.isActive_home ? isActive_home : false,
        isActive_about: locals.isActive_about ? isActive_about : false,
        isActive_blog: locals.isActive_blog ? isActive_blog : false
     }) %>
    <section class="flex row mb-32">
        <%- include("icon", { patreon: true, cssClass: iconColor }) %>
        <%- include("icon", { twitter: true, cssClass: iconColor }) %>
        <%- include("icon", { instagram: true, cssClass: iconColor }) %>
    </section>
</div>