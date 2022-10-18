<section id="share" class="layer share closed zindex-4">
    <div id="share-click-area" class="click-area">
        <span>Share this Voting!</span>
        <h1 class="big"><span data-top-team><%= vote[0].top.name %></span> vs <span data-bottom-team><%= vote[0].bottom.name %></span></h1>
        <input class="btn-link" type="text" value="blrd.io/<%= vote[0].id %>" readonly data-share-link />
        <div class="copy-notice">
            <span class="default">Tap to Copy</span>
            <span class="success closed">Copied to your clipboard!</span>
        </div>
    </div>
    <div class="backdrop-area" style="background: linear-gradient(153deg, var(--<%= vote[0].top.color %>) 0%, var(--<%= vote[0].bottom.color %>) 100%)"></div>
</section>