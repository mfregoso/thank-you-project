using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TYP.Web.Startup))]
namespace TYP.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
