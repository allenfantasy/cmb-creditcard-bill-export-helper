const slice = Array.prototype.slice

function getBillList() {
  let rowElementList = slice.call(document.querySelectorAll('#loopband2 > table #fixband15 > table'), 0)
  return rowElementList.map(function(el) {
    return slice.call(el.querySelectorAll('font'), 0).map(function(fontEl) { return fontEl.innerText })
  })
}

function exportToCsv(data) {
  const fileName = 'test'
  const columns = ['交易日', '记账日', '交易摘要', '人民币金额', '卡号末四位', '交易地点', '交易地金额']
  let exporter = new CSVExporter({
    fileName,
    columns,
    data
  })
  exporter.export()
}

function isCmbMail() {
  const cmbCssSelector = "img[src*='ebank.cmbchina']"
  return !!document.querySelector(cmbCssSelector)
}

function sendMessage(type, text = "") {
  chrome.runtime.sendMessage({ type, text })
}

function render() {
  let button = document.createElement('div')
  button.id = "cmbBillExportButton"
  button.innerHTML = "导出"
  
  button.addEventListener('click', () => {
    exportToCsv(getBillList())
  })

  document.body.appendChild(button)
}

(function main() {
  if (isCmbMail()) {
    render()
    sendMessage('ENABLE_ICON')
  } else {
    sendMessage('DISABLE_ICON')
    console.log('not cmb mail')
  }
})()