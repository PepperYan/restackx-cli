define(
    [
        'react',
    ],
    function (React, HeaderMessages, HeaderNotifications, HeaderTasks) {
        var HeaderBar = React.createClass({
            getInitialState: function () {
                return {
                    title:this.props.title
                }
            },
            render: function () {
                var that = this;
                return (
                    <header className="main-header">
                        {this.props.back&&
                          <a href="javascript:void(0)" className="header-btn-back" onClick={this.props.onNavBack}><i className="fa fa-chevron-left"></i></a>
                        }
                        {/* Logo */}
                        <div className="logo">
                            {/* mini logo for sidebar mini 50x50 pixels */}
                            <span className="logo-mini"><b>A</b>LT</span>
                            {/* logo for regular state and mobile devices */}
                            <span className="logo-lg">{this.props.title}</span>
                        </div>
                        {/* Header Navbar: style can be found in header.less 这里未来要拆分成nav */}
                        {this.props.children}
                    </header>
                )
            }
        });

        return HeaderBar;
    }
)
