using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace academy.rise_tech.com.Code
{
	public static class HtmlHelpers
	{
		public static MvcHtmlString Image(this HtmlHelper helper, string src, string srcBig, int width = 0, int height = 0)
		{
			return new MvcHtmlString("<img src=\"/Content/" + src + "\" data-src=\"/Content/" + srcBig + "\" style=\"" + (width == 0 ? "" : "width:" + width + "px;") + (height == 0 ? "" : "height:" + height + "px;") + "\" />");
		}
	}
}