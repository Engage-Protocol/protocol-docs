// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item "><a href="index.html">Home</a></li><li class="chapter-item affix "><li class="part-title">src</li><li class="chapter-item "><a href="src/offchain/index.html">❱ offchain</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="src/offchain/uma/index.html">❱ uma</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="src/offchain/uma/SessionResultAsserter.sol/abstract.SessionResultAsserter.html">SessionResultAsserter</a></li></ol></li></ol></li><li class="chapter-item "><a href="src/prompt/index.html">❱ prompt</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="src/prompt/IPromptStrategy.sol/struct.BaseReaction.html">BaseReaction</a></li><li class="chapter-item "><a href="src/prompt/IPromptStrategy.sol/struct.Result.html">Result</a></li><li class="chapter-item "><a href="src/prompt/IPromptStrategy.sol/interface.IPromptStrategy.html">IPromptStrategy</a></li><li class="chapter-item "><a href="src/prompt/ISolutionRecorder.sol/interface.ISolutionRecorder.html">ISolutionRecorder</a></li><li class="chapter-item "><a href="src/prompt/MajorityChoicePrompt.sol/contract.MajorityChoicePrompt.html">MajorityChoicePrompt</a></li><li class="chapter-item "><a href="src/prompt/SPBinaryPrompt.sol/contract.SPBinaryPrompt.html">SPBinaryPrompt</a></li><li class="chapter-item "><a href="src/prompt/TriviaChoicePrompt.sol/contract.TriviaChoicePrompt.html">TriviaChoicePrompt</a></li></ol></li><li class="chapter-item "><a href="src/reward/index.html">❱ reward</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="src/reward/FixedRanksReward.sol/contract.FixedRanksReward.html">FixedRanksReward</a></li><li class="chapter-item "><a href="src/reward/IRewardStrategy.sol/interface.IRewardStrategy.html">IRewardStrategy</a></li><li class="chapter-item "><a href="src/reward/ProportionalToXPReward.sol/contract.ProportionalToXPReward.html">ProportionalToXPReward</a></li></ol></li><li class="chapter-item "><a href="src/session/index.html">❱ session</a><a class="toggle"><div>❱</div></a></li><li><ol class="section"><li class="chapter-item "><a href="src/session/DefaultSession.sol/contract.DefaultSession.html">DefaultSession</a></li><li class="chapter-item "><a href="src/session/ISessionManager.sol/interface.ISessionManager.html">ISessionManager</a></li><li class="chapter-item "><a href="src/session/ISessionStrategy.sol/interface.ISessionStrategy.html">ISessionStrategy</a></li></ol></li><li class="chapter-item "><a href="src/DepositManager.sol/abstract.DepositManager.html">DepositManager</a></li><li class="chapter-item "><a href="src/QuestionManager.sol/abstract.QuestionManager.html">QuestionManager</a></li><li class="chapter-item "><a href="src/Registry.sol/contract.Registry.html">Registry</a></li><li class="chapter-item "><a href="src/Roles.sol/constants.Roles.html">Roles constants</a></li><li class="chapter-item "><a href="src/SessionManager.sol/contract.SessionManager.html">SessionManager</a></li><li class="chapter-item "><a href="src/SessionManagerBase.sol/enum.SessionState.html">SessionState</a></li><li class="chapter-item "><a href="src/SessionManagerBase.sol/struct.Game.html">Game</a></li><li class="chapter-item "><a href="src/SessionManagerBase.sol/abstract.SessionManagerBase.html">SessionManagerBase</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
