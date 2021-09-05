function serializeObj(form) {
    let result = {};
    $(form).serializeArray().forEach(item => {
        result[item.name] = item.value;
    })
    return result;
}