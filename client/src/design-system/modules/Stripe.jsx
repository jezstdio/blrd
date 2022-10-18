<% if (locals.resultStripe) { %>
    <section class="<%= locals.cssClass ? cssClass : '' %>">
        <div class="mb-8 stat-strip <%= locals.winner === 'secondary' ? 'black-text-48' : '' %> <%= `${primary.color}-bg` %>" style="margin-right: <%= `${100 - primary.status}%` %>"><%= `${primary.score}` %></div>
        <div class="stat-strip <%= locals.winner === 'primary' ? 'black-text-48' : '' %> <%= `${secondary.color}-bg` %>" style="margin-right: <%= `${100 - secondary.status}%` %>"><%= `${secondary.score}` %></div>
    </section>
<% } %>

<% if (locals.voteStripe) { %>
    <a class="strip <%= locals.winner === 'primary' ? `${primary.color}-bg-dark` : locals.winner === 'secondary' ? `${secondary.color}-bg` : locals.winner === 'draw' ? 'black-bg' : `${secondary.color}-bg` %>" href="/<%= target %>">
        <span class="block w-100 fontSize-24 zindex-1">
            <%- `<span class="${locals.winner === 'secondary' ? 'darkGrey-text-72' : ''}">${primary.name}</span>` %>
            <%- `<span class="${locals.winner === 'secondary' || locals.winner === 'primary' ? 'darkGrey-text-72' : ''}">vs</span>` %>
            <%- `<span class="${locals.winner === 'primary' ? 'darkGrey-text-72' : ''}">${secondary.name}</span>` %>
        </span>
        <small class="block w-100 fontSize-10 zindex-1" data-enddate="<%= `${locals.endDate ? endDate : 'Ended'}` %>"><%= `${locals.counter ? counter : 'Ended'}` %></small>
        <div class="vote-status zindiex-0 <%= locals.winner === 'secondary' ? `${secondary.color}-bg-dark` : locals.winner === 'primary' ? `${primary.color}-bg` : locals.winner === 'draw' ? 'darkGrey2-bg' : `${primary.color}-bg` %>" style="width: <%= `${status}%` %>"></div>
    </a>
<% } %>