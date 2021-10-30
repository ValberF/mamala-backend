module.exports = app => {
    const { validateAdmin } = app.config.validateTokenAdmin

    app.get("/", (req, res) => {return res.status(200).json("Backend executando!")})
    app.route("/admin").post(validateAdmin, app.api.admin.post)
    app.route("/login").post(app.api.adminAuth.signIn)
    app.get("/childBirth/:id", validateAdmin, app.api.childBirth.get)
    app.get("/stock", app.api.stock.get)

    app.route("/address")
        .get(validateAdmin, app.api.address.get)
        .post(validateAdmin, app.api.address.post)

    app.route("/address/:id")
        .get(validateAdmin, app.api.address.getById)
        .delete(validateAdmin, app.api.address.remove)

    app.route("/donor")
        .get(validateAdmin, app.api.donor.get)
        .post(validateAdmin, app.api.donor.post)

    app.route("/donor/:id")
        .get(validateAdmin, app.api.donor.getById)
        .delete(validateAdmin, app.api.donor.remove)
        .put(validateAdmin, app.api.donor.put)

    app.route("/beneficiary")
        .get(validateAdmin, app.api.beneficiary.get)
        .post(validateAdmin, app.api.beneficiary.post)

    app.route("/beneficiary/:id")
        .get(validateAdmin, app.api.beneficiary.getById)
        .delete(validateAdmin, app.api.beneficiary.remove)
        .put(validateAdmin, app.api.beneficiary.put)

    app.route("/prenatal")
        .get(validateAdmin, app.api.prenatal.get)
        .post(validateAdmin, app.api.prenatal.post)

    app.route("/prenatal/:id")
        .get(validateAdmin, app.api.prenatal.getById)
        .delete(validateAdmin, app.api.prenatal.remove)

    app.route("/postnatal")
        .get(validateAdmin, app.api.postnatal.get)
        .post(validateAdmin, app.api.postnatal.post)

    app.route("/postnatal/:id")
        .get(validateAdmin, app.api.postnatal.getById)
        .delete(validateAdmin, app.api.postnatal.remove)

    app.route("/obstetrician")
        .get(validateAdmin, app.api.obstetrician.get)
        .post(validateAdmin, app.api.obstetrician.post)

    app.route("/obstetrician/:id")
        .get(validateAdmin, app.api.obstetrician.getById)
        .delete(validateAdmin, app.api.obstetrician.remove)

    app.route("/donation")
        .get(validateAdmin, app.api.donation.get)
        .post(validateAdmin, app.api.donation.post)

    app.route("/donation/:id")
        .get(validateAdmin, app.api.donation.getById)
        .delete(validateAdmin, app.api.donation.remove)
        .put(validateAdmin, app.api.donation.put)

    app.route("/receivement")
        .get(validateAdmin, app.api.receivement.get)
        .post(validateAdmin, app.api.receivement.post)

    app.route("/receivement/:id")
        .get(validateAdmin, app.api.receivement.getById)
        .delete(validateAdmin, app.api.receivement.remove)
}