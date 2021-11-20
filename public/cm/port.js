axios
  .get(window.location.origin + "/get-port")
  .then(
    (data) =>
      (document.querySelector('input[name = "vport"]').value = data.data.port)
  );
