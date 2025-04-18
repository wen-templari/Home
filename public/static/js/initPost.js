console.log("postInit.js loaded")
var scriptMd5 = document.createElement("script")
scriptMd5.src = "/static/js/md5.js"
document.head.appendChild(scriptMd5)

scriptMd5.onload = function () {
  console.log("md5.js loaded")
  // step1. lazyload
  initLazyLoad()
}

function initLazyLoad() {
  var script = document.createElement("script")
  script.src = "/static/js/animation.js"
  document.head.appendChild(script)

  script.onload = function () {
    console.log("lazyload.js loaded")

    animationElementName = ".image-load"

    // Hook the loadImage function
    loadImage = (index) => {
      if (index >= imageElements.length) return

      const image = imageElements[index]
      image.src = image.dataset.src
      const img = new Image()
      img.src = image.src
      img.onload = function () {
        loadImage(index + 1)
      }
    }

    loadAnimation = (item) => {
      const grandSon = item.firstChild.firstChild
      const img = new Image()
      img.src = grandSon.src
      const sign = md5(grandSon.src)

      img.onload = function () {
        const percent = ((img.height / img.width) * 100).toFixed(5)
        var style = document.createElement("style")
        style.innerHTML = renderStyle(sign, percent)
        const target = document.getElementById(`lht${sign}`)

        if (!target) return
        target.parentNode.insertBefore(style, target)
        item.classList.remove("image-load")
        item.classList.add("image-loaded")
      }
    }

    initImage()
  }
}

function renderStyle(sign, percent) {
  return `
      .image-${sign} {
      width: 100%;
      padding-top: ${percent}%;
      height: auto;
  }

  @media only screen and (max-width: 1068px) {
      .image-${sign} {
      width: 100%;
      padding-top: ${percent}%;
      height: auto;
    }
  }

  @media only screen and (max-width: 734px) {
    .image-${sign} {
    width: 100%;
    padding-top: ${percent}%;
    height: auto;
  }
  };`
}
