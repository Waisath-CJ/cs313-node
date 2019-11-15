function calcStamped (weight) {
    if (weight > 0 && weight <= 1.0) { return 0.55; }
    else if (weight > 1.0 && weight <= 2.0) { return 0.70; }
    else if (weight > 2.0 && weight <= 3.0) { return 0.85; }
    else if (weight > 3.0 && weight <= 3.5) { return 1.00; }
    else if (weight > 3.5) { return calcEnvelope(weight); }
}

function calcMetered (weight) {
    if (weight > 0 && weight <= 1.0) { return 0.50; }
    else if (weight > 1.0 && weight <= 2.0) { return 0.65; }
    else if (weight > 2.0 && weight <= 3.0) { return 0.80; }
    else if (weight > 3.0 && weight <= 3.5) { return 0.95; }
    else if (weight > 3.5) { return calcEnvelope(weight); }
}

function calcEnvelope (weight) {
    if (weight > 0 && weight <= 1.0) { return 1.00; }
    else if (weight > 1.0 && weight <= 2.0) { return 1.15; }
    else if (weight > 2.0 && weight <= 3.0) { return 1.30; }
    else if (weight > 3.0 && weight <= 4.0) { return 1.45; }
    else if (weight > 4.0 && weight <= 5.0) { return 1.60; }
    else if (weight > 5.0 && weight <= 6.0) { return 1.75; }
    else if (weight > 6.0 && weight <= 7.0) { return 1.90; }
    else if (weight > 7.0 && weight <= 8.0) { return 2.05; }
    else if (weight > 8.0 && weight <= 9.0) { return 2.20; }
    else if (weight > 9.0 && weight <= 10.0) { return 2.35; }
    else if (weight > 10.0 && weight <= 11.0) { return 2.50; }
    else if (weight > 11.0 && weight <= 12.0) { return 2.65; }
    else if (weight > 12.0 && weight <= 13.0) { return 2.80; }
}

function calcPackage (weight) {
    if (weight > 0 && weight <= 1.0) { return 3.66; }
    else if (weight > 1.0 && weight <= 2.0) { return 3.66; }
    else if (weight > 2.0 && weight <= 3.0) { return 3.66; }
    else if (weight > 3.0 && weight <= 4.0) { return 3.66; }
    else if (weight > 4.0 && weight <= 5.0) { return 4.39; }
    else if (weight > 5.0 && weight <= 6.0) { return 4.39; }
    else if (weight > 6.0 && weight <= 7.0) { return 4.39; }
    else if (weight > 7.0 && weight <= 8.0) { return 4.39; }
    else if (weight > 8.0 && weight <= 9.0) { return 5.19; }
    else if (weight > 9.0 && weight <= 10.0) { return 5.19; }
    else if (weight > 10.0 && weight <= 11.0) { return 5.19; }
    else if (weight > 11.0 && weight <= 12.0) { return 5.19; }
    else if (weight > 12.0 && weight <= 13.0) { return 5.71; }
}

function calculatePrice (mail_type, weight) {
    switch(mail_type) {
        case "Letter (Stamped)":
            return calcStamped(weight);
        case "Letter (Metered)":
            return calcMetered(weight);
        case "Large Envelope (Flats)":
            return calcEnvelope(weight);
        default:
            return calcPackage(weight);
    }
}

function formatPrice (price) {
    return Number.parseFloat(price).toFixed(2);
}

function getRate (req, res) {
    var mail_type = req.query.mail_type;
    var weight = Number(req.query.weight);
    var price = calculatePrice(mail_type, weight);
    price = formatPrice(price);

    var params = {mail_type: mail_type, weight: weight, price: price};
    res.render('getRate', params);
}

module.exports = {getRate: getRate};