var ajaxCall = (query, language) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://851e-2401-4900-1c1a-8fff-00-697-4baa.ngrok-free.app/",
      type: "POST",
      dataType: "json",
      data: JSON.stringify({
        query: query,
        language: language
      }),
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};


(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(query, language) {
      const { response } = await ajaxCall(
        query,
        language
      );
      //console.log(response.choices[0].text);
      return response.choices[0].text;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();