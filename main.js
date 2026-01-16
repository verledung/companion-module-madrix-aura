const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Host (IP Address)',
				width: 12,
				default: '',
				required: true
			}
		]
	}

	getActions() {
		const actions = {}

		actions['playback_state'] = {
			name: 'Playback State',
			description: 'Control playback: set a specific state or toggle between two states',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: [
						{ id: 'set', label: 'Set State' },
						{ id: 'toggle', label: 'Toggle Between States' }
					],
					default: 'set'
				},
				{
					type: 'dropdown',
					id: 'state',
					label: 'State',
					choices: [
						{ id: 'play', label: 'Play' },
						{ id: 'pause', label: 'Pause' },
						{ id: 'stop', label: 'Stop' }
					],
					default: 'play',
					isVisible: (options) => options.mode === 'set'
				},
				{
					type: 'dropdown',
					id: 'toggle_state1',
					label: 'Toggle State 1',
					choices: [
						{ id: 'play', label: 'Play' },
						{ id: 'pause', label: 'Pause' },
						{ id: 'stop', label: 'Stop' }
					],
					default: 'play',
					isVisible: (options) => options.mode === 'toggle'
				},
				{
					type: 'dropdown',
					id: 'toggle_state2',
					label: 'Toggle State 2',
					choices: [
						{ id: 'play', label: 'Play' },
						{ id: 'pause', label: 'Pause' },
						{ id: 'stop', label: 'Stop' }
					],
					default: 'pause',
					isVisible: (options) => options.mode === 'toggle'
				}
			],
			callback: async (action) => {
				if (action.options.mode === 'set') {
					await this.sendCommand(action.options.state)
				} else {
					// Toggle logic
					if (!this.playbackState) {
						this.playbackState = action.options.toggle_state1
					}
					
					if (this.playbackState === action.options.toggle_state1) {
						this.playbackState = action.options.toggle_state2
					} else {
						this.playbackState = action.options.toggle_state1
					}
					
					await this.sendCommand(this.playbackState)
				}
			}
		}

		actions['intensity'] = {
			name: 'Intensity',
			description: 'Control master intensity: set to a specific value, increase, or decrease',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: [
						{ id: 'set', label: 'Set Value' },
						{ id: 'increase', label: 'Increase' },
						{ id: 'decrease', label: 'Decrease' }
					],
					default: 'set'
				},
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					min: 0,
					max: 255,
					default: 255,
					isVisible: (options) => options.mode === 'set'
				},
				{
					type: 'number',
					id: 'step',
					label: 'Step Value',
					min: 0,
					max: 255,
					default: 26,
					isVisible: (options) => options.mode === 'increase' || options.mode === 'decrease'
				}
			],
			callback: async (action) => {
				if (action.options.mode === 'set') {
					await this.sendCommand('intensity', action.options.value)
				} else if (action.options.mode === 'increase') {
					await this.sendCommand('intensityinc', action.options.step)
				} else {
					await this.sendCommand('intensitydec', action.options.step)
				}
			}
		}

		actions['speed'] = {
			name: 'Speed',
			description: 'Control playback speed: set to a specific value, increase, or decrease',
			options: [
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: [
						{ id: 'set', label: 'Set Value' },
						{ id: 'increase', label: 'Increase' },
						{ id: 'decrease', label: 'Decrease' }
					],
					default: 'set'
				},
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					min: 0,
					max: 255,
					default: 100,
					isVisible: (options) => options.mode === 'set'
				},
				{
					type: 'number',
					id: 'step',
					label: 'Step Value',
					min: 0,
					max: 255,
					default: 10,
					isVisible: (options) => options.mode === 'increase' || options.mode === 'decrease'
				}
			],
			callback: async (action) => {
				if (action.options.mode === 'set') {
					await this.sendCommand('speed', action.options.value)
				} else if (action.options.mode === 'increase') {
					await this.sendCommand('speedinc', action.options.step)
				} else {
					await this.sendCommand('speeddec', action.options.step)
				}
			}
		}

		actions['cue'] = {
			name: 'Specific Cue',
			description: 'Jump to a specific cue number',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Cue Number',
					min: 1,
					max: 255,
					default: 1
				}
			],
			callback: async (action) => {
				await this.sendCommand('cue', action.options.value)
			}
		}

		actions['previous_cue'] = {
			name: 'Previous Cue',
			description: 'Go to the previous cue',
			options: [],
			callback: async (action) => {
				await this.sendCommand('previous')
			}
		}

		actions['next_cue'] = {
			name: 'Next Cue',
			description: 'Go to the next cue',
			options: [],
			callback: async (action) => {
				await this.sendCommand('next')
			}
		}

		actions['record'] = {
			name: 'Record',
			description: 'Start/stop recording',
			options: [],
			callback: async (action) => {
				await this.sendCommand('record')
			}
		}

		actions['group_intensity'] = {
			name: 'Group Intensity',
			description: 'Control intensity for a specific group (1-8): set to a specific value, increase, or decrease',
			options: [
				{
					type: 'dropdown',
					id: 'group',
					label: 'Group',
					choices: [
						{ id: '1', label: 'Group 1' },
						{ id: '2', label: 'Group 2' },
						{ id: '3', label: 'Group 3' },
						{ id: '4', label: 'Group 4' },
						{ id: '5', label: 'Group 5' },
						{ id: '6', label: 'Group 6' },
						{ id: '7', label: 'Group 7' },
						{ id: '8', label: 'Group 8' }
					],
					default: '1'
				},
				{
					type: 'dropdown',
					id: 'mode',
					label: 'Mode',
					choices: [
						{ id: 'set', label: 'Set Value' },
						{ id: 'increase', label: 'Increase' },
						{ id: 'decrease', label: 'Decrease' }
					],
					default: 'set'
				},
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					min: 0,
					max: 255,
					default: 100,
					isVisible: (options) => options.mode === 'set'
				},
				{
					type: 'number',
					id: 'step',
					label: 'Step Value',
					min: 0,
					max: 255,
					default: 26,
					isVisible: (options) => options.mode === 'increase' || options.mode === 'decrease'
				}
			],
			callback: async (action) => {
				const group = action.options.group
				if (action.options.mode === 'set') {
					await this.sendCommand(`group${group}`, action.options.value)
				} else if (action.options.mode === 'increase') {
					await this.sendCommand(`group${group}inc`, action.options.step)
				} else {
					await this.sendCommand(`group${group}dec`, action.options.step)
				}
			}
		}

		return actions
	}

	async init(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Ok)
		this.setActionDefinitions(this.getActions())
	}

	async destroy() {
		// cleanup
	}

	async configUpdated(config) {
		this.config = config
	}

	sendCommand(command, value) {
		return new Promise((resolve, reject) => {
			const http = require('http')
			const host = this.config.host

			let url = `http://${host}/remote.cgi?${command}`
			if (value !== undefined) {
				url += `=${value}`
			}

			this.log('info', `Sending command: ${url}`)

			http.get(url, (res) => {
				this.log('info', `Command sent successfully (Status: ${res.statusCode})`)
				resolve()
			}).on('error', (err) => {
				this.log('error', `Failed to send command: ${err.message}`)
				reject(err)
			})
		})
	}
}

module.exports = ModuleInstance

runEntrypoint(ModuleInstance, [])
