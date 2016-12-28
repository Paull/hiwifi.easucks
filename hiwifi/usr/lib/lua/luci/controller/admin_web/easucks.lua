module("luci.controller.admin_web.easucks", package.seeall)

function index()
	entry({"admin_web", "easucks"}, template("admin_web/easucks/index"), _("status"), 700, true)
	entry({"admin_web", "easucks", "ss"}, template("admin_web/easucks/ss"), _("status"), 700, true)
end
