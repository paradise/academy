using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace academy.rise_tech.com.Controllers
{
	public class HomeController : Controller
	{

		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Courses()
		{
			return View();
		}

		public ActionResult Introduction()
		{
			return View();
		}

		public ActionResult Events()
		{
			return View();
		}

		public ActionResult Team()
		{
			return View();
		}

		public FileResult LoadFile(string id)
		{
			return File("/pdf/" + id + ".pdf", "application/pdf");
		}

	}
}
