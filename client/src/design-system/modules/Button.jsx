<<%= tag %> <%- locals.type ? `type="${type}"` : '' %><%- locals.href ? `href="${target}"` : '' %> class="btn <%= locals.bgColor %> <%= cssClass %>" <%= locals.id ? `id=${id}` : ''%> <%= locals.dataColor ? `data-${position}-color=${dataColor}` : '' %>>
    <%- locals.icon ? `<i class="icon-${icon}"></i>` : '' %>
    <%- locals.text ? text : '' %>
</<%= tag %>>