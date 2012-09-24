using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace academy.rise_tech.com.Controllers
{
	public class AboutController : Controller
	{
		//
		// GET: /About/

		public ActionResult Team()
		{
			return View();
		}

		public ActionResult Academy()
		{
			return View();
		}

		public ActionResult Events()
		{
			return View();
		}

		public ActionResult SMI()
		{
			return View();
		}

		public ActionResult Review()
		{
			return RedirectToAction("Index", "Home");
			//return View();
		}
	}
}
