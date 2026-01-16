# Changelog

All notable changes to the MADRIX Aura Companion Module will be documented in this file.

## [1.0.0] - 2026-01-16

### Added
- Initial release of MADRIX Aura Companion Module
- Full HTTP control support for MADRIX Aura 2/8/12/32
- 8 master actions:
  - Playback Control (Play, Pause, Stop, Toggle)
  - Cue Navigation (Next, Previous, Specific Cue)
  - Intensity Control (Master and Group 1-8, with Set/Increase/Decrease modes)
  - Speed Control (Set/Increase/Decrease modes)
  - Recording (Start/Stop)
- Comprehensive documentation with dual setup methods (Hardware Manager and SD Card)
- Complete XML configuration examples
- Detailed troubleshooting guide
- Network configuration guidelines

### Fixed
- URL handling with input sanitization (removes http://, https://, trailing slashes)

### Technical Details
- Framework: Bitfocus Companion v4.0+
- @companion-module/base v1.12.1
- HTTP GET protocol for remote.cgi endpoints
- Configuration field for Host (IP Address)

---

## Version History

| Version | Release Date | Notes |
|---------|-------------|-------|
| 1.0.0 | 2026-01-16 | Initial release |

---

## Planned Features (Future Releases)

- [ ] Adding Feedback (MADRIX Aura doesnt support it yet..)


---

For the latest updates and source code, visit:
**Repository:** https://github.com/verledung/companion-module-madrix-aura

Made with ❤ by **verLEDung - LED- & Veranstaltungstechnik**

Website: https://verledung.com  
Impressum: https://verledung.com/impressum

**You need MADRIX installations or programming?**  
Contact: kontakt@verledung.com

