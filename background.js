    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        //matches page content to actions
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          css: ["input[type='password']"],
        })
        ],
            actions: [new chrome.declarativeContent.ShowBrowserAction()]
      }]);
    });
  });