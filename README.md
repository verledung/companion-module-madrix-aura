# MADRIX Aura 2/8/12/32 Companion Module

This module allows you to control **MADRIX Aura 2, Aura 8, Aura 12, and Aura 32** lighting controllers via HTTP commands using **Bitfocus Companion**.

**Repository:** https://github.com/verledung/companion-module-madrix-aura

## Features

- **Playback Control**: Play, Pause, Stop, Toggle states
- **Cue Navigation**: Jump to specific cues, next/previous cue
- **Intensity Control**: Master intensity with set/increase/decrease modes
- **Group Intensity**: Control individual group intensity (Groups 1-8)
- **Speed Control**: Playback speed adjustment
- **Recording**: Start/stop recording functionality

## Installation

1. Install [Bitfocus Companion](https://bitfocus.io/companion/)
2. Add this module through Companion's Module Library
3. Configure the IP address of your MADRIX Aura device
4. Follow the setup instructions in the module's HELP section

## Requirements

- **MADRIX Aura 2/8/12/32** device
- Network connectivity between Companion and the Aura device
- Configured ShowConfig.xml with remote HTTP command definitions
- IP address of the Aura device (found on device label or via Hardware Manager)

## Setup Instructions

For detailed setup instructions, please refer to the **HELP.md** section in the Companion module interface, which includes:

- Two setup methods (Hardware Manager or SD Card Direct)
- Required XML configuration lines
- Troubleshooting guide
- Complete command reference

## Configuration

Configure the module with:
- **Host (IP Address)**: The network IP address of your MADRIX Aura device

Example: `10.84.0.44`

## Support

For issues, questions, or feature requests, please contact:
- **verLEDung - LED- & Veranstaltungstechnik**
- Email: info@verledung.com

## License

MIT License - See LICENSE file for details

## Acknowledgments

This module was developed for controlling MADRIX Aura lighting controllers in professional event and lighting setups.
