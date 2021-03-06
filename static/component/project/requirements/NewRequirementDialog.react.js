/**
 * Copyright(c) 2012-2016 weizoom
 */
"use strict";

var debug = require('debug')('m:project.projects:NewProjectDialog');
var React = require('react');
var ReactDOM = require('react-dom');

var Reactman = require('reactman');

// var Store = require('./Store');
// var Constant = require('./Constant');
var Action = require('./Action');

var NewRequirementDialog = Reactman.createDialog({
	getInitialState: function() {
		var defaultContent = '';
		if (this.props.type === 'requirement') {
			defaultContent = '我作为:（角色）<br/><br/><br/>想要：（功能）<br/><br/><br/>以实现：（商业价值）';
		}
		return {
			title: '',
			importance: '3',
			content: defaultContent
		};
	},

	onChange: function(value, event) {
		var property = event.target.getAttribute('name');
		var newState = {};
		newState[property] = value;
		this.setState(newState);
	},

	onBeforeCloseDialog: function() {
		var data = _.clone(this.state);
		data['project_id'] = this.props.data.projectId;

		var resource = 'project.requirement';
		if (this.props.type === 'business-requirement') {
			resource = 'project.business_requirement'
		} else if (this.props.type === 'product-requirement') {
			resource = 'project.product_requirement'
		}

		alert(resource);
		return;

		Reactman.Resource.put({
			resource: resource,
			data: data,
			success: function() {
				this.closeDialog();
			},
			error: function() {
				Reactman.PageAction.showHint('error', '创建需求失败!');
			},
			scope: this
		})
	},

	render:function(){
		var importanceOptions = [{
			text: '1（最高）',
			value: '1'
		}, {
			text: '2',
			value: '2'
		}, {
			text: '3（普通）',
			value: '3'
		}, {
			text: '4',
			value: '4'
		}, {
			text: '5（最低）',
			value: '5'
		}];

		var titleLabel = "故事名:";
		var contentLabel = "故事详情:";
		if (this.props.type !== 'requirement') {
			titleLabel = "需求名:";
			contentLabel = "需求详情:";
		}

		return (
		<div className="xui-formPage xui-project-newRequirementDialog">
			<form className="form-horizontal mt15">
				<fieldset>
					<Reactman.FormInput label={titleLabel} name="title" validate="require-string" value={this.state.title} onChange={this.onChange} autoFocus={true} inDialog={true} />
					<Reactman.FormSelect label="重要度:" name="importance" options={importanceOptions} value={this.state.importance} />
					<Reactman.FormRichTextInput label={contentLabel} name="content" validate="require-string" value={this.state.content} onChange={this.onChange} width={730} height={300}/>
				</fieldset>
			</form>
		</div>
		)
	}
})
module.exports = NewRequirementDialog;