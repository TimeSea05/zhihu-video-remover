// ==UserScript==
// @name         ZhihuVideoRemover
// @namespace    https://github.com/TimeSea05/zhihu-video-remover
// @version      0.1
// @description  remove annoying zhihu videos
// @author       Avalanche
// @match        *://www.zhihu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function hasVideoAtIndex(card) {
    return JSON.parse(card.childNodes[0].getAttribute('data-za-extra-module')).card.has_video
  }

  function removeZhihuVideosAtIndex() {
    const recommendCardSelector = 'div[class="Card TopstoryItem TopstoryItem-isRecommend"]'
    let cards = document.querySelectorAll(recommendCardSelector)

    for (let card of cards) {
      if (hasVideoAtIndex(card)) {
        card.remove()
      }
    }
  }

  function removeZhihuAdsAtIndex() {
    const adCardSelector = "div[class=Card TopstoryItem TopstoryItem--advertCard TopstoryItem-isRecommend]"
    let adCards = document.querySelectorAll(adCardSelector)
    for (let card of adCards) {
      card.remove()
    }
  }

  function hasVideoAtAnswers(answer) {
    for (let node of answer.childNodes) {
      if (node.className === 'VideoAnswerPlayer') {
        return true
      }
    }

    return false
  }

  function removeZhihuVideosAtAnswers() {
    const answerSelector = 'div[class="ContentItem AnswerItem"]'
    let answers = document.querySelectorAll(answerSelector)

    for (let answer of answers) {
      if (hasVideoAtAnswers(answer)) {
        answer.remove()
      }
    }
  }

  function removeZhihuVideos() {
    // at index page or '/questions' page
    if (document.URL === "https://www.zhihu.com/") {
      removeZhihuVideosAtIndex()
      removeZhihuAdsAtIndex()
    } else if (document.URL.indexOf("https://www.zhihu.com/question/") !== -1) {
      removeZhihuVideosAtAnswers()
    }
  }

  document.addEventListener('wheel', event => {
    removeZhihuVideos()
  })

  removeZhihuVideos()
})();